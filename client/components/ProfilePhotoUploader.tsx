import { useState } from "react";
import { Image, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@shared/supabase";

interface ProfilePhotoUploaderProps {
  isAdmin: boolean;
  userId?: string;
  userEmail?: string;
  userName?: string;
  onSuccess?: () => void;
}

export default function ProfilePhotoUploader({
  isAdmin,
  userId = "user_123",
  userEmail = "user@example.com",
  userName = "User Name",
  onSuccess,
}: ProfilePhotoUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Arquivo muito grande! Máximo 5MB.");
      return;
    }

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Por favor, selecione uma imagem válida!");
      return;
    }

    setFile(selectedFile);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecione uma imagem!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Create a simple data URL for storage (in production, use storage service)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;

        if (isAdmin) {
          // Admins can change directly - update localStorage
          const adminProfile = JSON.parse(localStorage.getItem("admin_profile") || "{}");
          adminProfile.profilePhoto = dataUrl;
          localStorage.setItem("admin_profile", JSON.stringify(adminProfile));

          setSuccess("Foto de perfil atualizada com sucesso!");
          setFile(null);
          setPreview(null);
          onSuccess?.();
        } else {
          // Normal users submit request
          const { error: insertError } = await supabase
            .from("profile_photo_requests")
            .insert({
              user_id: userId,
              user_email: userEmail,
              user_name: userName,
              photo_url: dataUrl,
              status: "pending",
            });

          if (insertError) {
            throw insertError;
          }

          setSuccess(
            "Solicitação de mudança de foto enviada! Aguarde aprovação do administrador."
          );
          setFile(null);
          setPreview(null);
          onSuccess?.();
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error("Erro ao enviar foto:", err);
      setError("Erro ao enviar foto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-2">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-500">{success}</p>
        </div>
      )}

      <div className="border-2 border-dashed border-blue-500/30 rounded-lg p-6 text-center">
        {preview ? (
          <div className="space-y-3">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <p className="text-sm text-muted-foreground">
              {file?.name}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Image className="w-8 h-8 mx-auto text-blue-400 opacity-50" />
            <p className="text-sm text-muted-foreground">
              Clique para selecionar uma imagem
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG até 5MB
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute opacity-0 cursor-pointer w-full h-full"
          disabled={loading}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${
          isAdmin
            ? "bg-yellow-600 hover:bg-yellow-700 text-white disabled:opacity-50"
            : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
        }`}
      >
        {loading
          ? isAdmin
            ? "Salvando..."
            : "Enviando solicitação..."
          : isAdmin
            ? "Salvar Foto"
            : "Solicitar Mudança"}
      </button>
    </div>
  );
}
