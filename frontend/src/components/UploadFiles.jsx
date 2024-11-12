import { Button } from "@/components/ui/button.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { BASE_URL, useUpload } from "@/hooks/useUpload";
import { Download, FileDown } from "lucide-react";

const UploadFiles = () => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    file,
    uploadPercentage,
    onUpload,
    allFiles,
  } = useUpload();
  return (
    <div className="w-full p-10 gap-10 flex flex-col items-center justify-center">
      <div
        className="flex flex-1 mt-10 w-full h-[100px] items-center justify-center p-20 flex-col border-2 border-dashed border-sky-400 hover:bg-gray-100  hover:border-sky-700 hover:border-2 border-primary bg-gray-50 rounded-md"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="flex items-center justify-between hover:text-primary text-gray-500 gap-10">
            <p className="text-gray-500 font-semibold text-2xl hover:text-primary">
              Drop the files here ...
            </p>
            <Download className="h-10 w-10" />
          </div>
        ) : (
          <div className="flex items-center justify-between hover:text-primary text-gray-500 gap-10">
            <p className="text-gray-500 font-semibold text-2xl hover:text-primary">
              {" "}
              Arrastre sus archivos o dele click y seleccione para subir
            </p>
            <Download className="h-20 w-20 " />
          </div>
        )}
      </div>

      {uploadPercentage > 0 && <Progress value={uploadPercentage} />}

      <Button size="lg" onClick={onUpload} className="text-xl">
        <Download className="h-8 w-8 text-green-400" /> Upload
      </Button>

      {file && (
        <div>
          <h1>Preview</h1>
          {file.path.includes("png" | "jpg" | "jpeg" | "svg" | "webp") && (
            <img
              className="h-32 w-32 object-fill"
              src={file.preview}
              alt={file.name}
            />
          )}

          <a className="" href={BASE_URL + "/" + file.path}>
            {file.name}
          </a>
        </div>
      )}

      <div>
        {allFiles.map((file) => (
          <div className="p-2" key={file._id}>
            {file.path.includes("png" | "jpg" | "jpeg" | "svg" | "webp") ? (
              <img
                className="h-32 w-32 object-fill "
                src={BASE_URL + "/" + file.path}
                alt={file.name}
              />
            ) : (
              <div>
                <a
                  className="text-blue-500 hover:underline flex justify-between items-center gap-2"
                  href={BASE_URL + "/" + file.path}
                >
                  <FileDown />
                  {file.name}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFiles;
