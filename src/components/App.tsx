// // App.tsx
// /* eslint-disable @typescript-eslint/no-var-requires */

import "../css/index.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ModeToggle } from "./ui/toggle-mode";
import { ThemeProvider } from "./theme-provider";
import { useState } from "react";
//YTDL
import fs from "fs";
import ytdl from "ytdl-core";
import { Toaster, toast } from "sonner";

// interface Format {
//   qualityLabel?: string;
// }
function App() {
  const [URL, setURL] = useState("");
  const [FORMAT, setFORMAT] = useState("");
  const [QUALITY, setQUALITY] = useState("");

  console.log(`URL:${URL} , Formato:${FORMAT} , Calidad:${QUALITY}`);

  const downloadVideo = () => {
    if (URL) {
      let ext: string;
      if (FORMAT == "Video") {
        ext = ".mp4";
      } else if (FORMAT == "Audio") {
        ext = ".mp3";
      }

      console.log("Descargando...");
      const downloadStream = ytdl(URL, { quality: "highest" });

      downloadStream.on("progress", (chunkLength, downloaded, total) => {
        const percent = (downloaded / total) * 100;
        console.log(`Descargado ${percent.toFixed(2)}%`);
      });

      downloadStream.on("end", () => {
        console.log("Descarga completada");
      });

      downloadStream.pipe(fs.createWriteStream(`video${ext}`));
    } else {
      toast.error("Please insert a URL");
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
        <div className="mt-5">
          <ModeToggle />
          <h1 className="font-mono scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Youtube Downloader
          </h1>
          <h2 className="font-mono leading-7 ">
            (Download videos without adds)
          </h2>
        </div>
        <div className="p-10 place-content-center flex-grow">
          <div className="m-3">
            <div>
              <Input
                onChange={(e) => setURL(e.target.value)}
                className=" text-center"
                placeholder="Copy a URL right here"
              />
            </div>
          </div>
          <div className="mt-3  flex">
            <div>
              <Select onValueChange={(e) => setFORMAT(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Formats</SelectLabel>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Audio">Audio</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="ml-5">
              <Select onValueChange={(e) => setQUALITY(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Resolutions</SelectLabel>
                    <SelectItem value="1080">1080p</SelectItem>
                    <SelectItem value="720">720p</SelectItem>
                    <SelectItem value="480">480p</SelectItem>
                    <SelectItem value="360">360p</SelectItem>
                    <SelectItem value="240">240p</SelectItem>
                    <SelectItem value="144">144p</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="ml-auto">
              <Toaster richColors position="top-right" />
              <Button onClick={() => downloadVideo()}>Download</Button>
            </div>
          </div>
        </div>
        <div className="text-center pb-4">
          <h1>Develop by William Gómez Fernández</h1>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

// App.tsx
/* eslint-disable @typescript-eslint/no-var-requires */

// import "../css/index.css";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { ModeToggle } from "./ui/toggle-mode";
// import { ThemeProvider } from "./theme-provider";
// import { useState } from "react";
// import ytdl from "ytdl-core";
// import fs from "fs";

// interface Format {
//   qualityLabel?: string;
// }

// function App() {
//   const [URL, setURL] = useState("");
//   const [FORMAT, setFORMAT] = useState("");
//   const [QUALITY, setQUALITY] = useState("");
//   const [progress, setProgress] = useState(0);

//   console.log(`URL:${URL} , Formato:${FORMAT} , Calidad:${QUALITY}`);

//   const downloadVideo = () => {
//     if (!URL) {
//       alert("Please enter a URL");
//       return;
//     }
//     if (!FORMAT) {
//       alert("Please select a format");
//       return;
//     }

//     let videoFilter: (format: Format) => boolean = () => false;
//     let ext: string;

//     if (FORMAT === "Video") {
//       switch (QUALITY) {
//         case "1080":
//           videoFilter = (format) => format.qualityLabel === "1080p";
//           break;
//         case "720":
//           videoFilter = (format) => format.qualityLabel === "720p";
//           break;
//         case "480":
//           videoFilter = (format) => format.qualityLabel === "480p";
//           break;
//         case "360":
//           videoFilter = (format) => format.qualityLabel === "360p";
//           break;
//         case "240":
//           videoFilter = (format) => format.qualityLabel === "240p";
//           break;
//         case "144":
//           videoFilter = (format) => format.qualityLabel === "144p";
//           break;
//         default:
//           videoFilter = () => true;
//       }
//       ext = ".mp4";
//     } else if (FORMAT === "Audio") {
//       ext = ".mp3";
//     }

//     console.log("Descargando...");

//     ytdl
//       .getInfo(URL)
//       .then((info) => {
//         const format = ytdl.chooseFormat(info.formats, { filter: videoFilter });
//         const outputPath = `${info.videoDetails.title}${QUALITY}${ext}`;

//         const stream = ytdl.downloadFromInfo(info, { format });

//         let downloaded = 0;
//         stream.on("response", (res) => {
//           const total = parseInt(res.headers["content-length"], 10);
//           res.on("data", (chunk: Buffer) => {
//             downloaded += chunk.length;
//             setProgress((downloaded / total) * 100);
//           });
//         });

//         stream.on("end", () => {
//           console.log("Descarga completada");
//           setProgress(100); // Set progress to 100 when done
//         });

//         stream.pipe(fs.createWriteStream(outputPath));
//       })
//       .catch((err) => {
//         console.error("Error obteniendo la información del video:", err);
//       });
//   };

//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
//         <div className="mt-5">
//           <ModeToggle />
//           <h1 className="font-mono scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
//             Youtube Downloader
//           </h1>
//           <h2 className="font-mono leading-7">(Download videos without ads)</h2>
//         </div>
//         <div className="p-10 place-content-center flex-grow">
//           <div className="m-3">
//             <div>
//               <Input
//                 onChange={(e) => setURL(e.target.value)}
//                 className="text-center"
//                 placeholder="Copy a URL right here"
//               />
//             </div>
//           </div>
//           <div className="mt-3 flex">
//             <div>
//               <Select onValueChange={(e) => setFORMAT(e)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a format" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Formats</SelectLabel>
//                     <SelectItem value="Video">Video</SelectItem>
//                     <SelectItem value="Audio">Audio</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="ml-5">
//               <Select onValueChange={(e) => setQUALITY(e)}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a resolution" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Resolutions</SelectLabel>
//                     <SelectItem value="1080">1080p(HD)</SelectItem>
//                     <SelectItem value="720">720p</SelectItem>
//                     <SelectItem value="480">480p</SelectItem>
//                     <SelectItem value="360">360p</SelectItem>
//                     <SelectItem value="240">240p</SelectItem>
//                     <SelectItem value="144">144p</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="ml-auto">
//               <Button onClick={downloadVideo}>Download</Button>
//             </div>
//           </div>
//           {progress > 0 && (
//             <div className="mt-4">
//               <p>Progreso de la descarga: {progress.toFixed(2)}%</p>
//               <div className="relative pt-1">
//                 <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
//                   <div
//                     style={{ width: `${progress}%` }}
//                     className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="text-center pb-4">
//           <h1>Developed by William Gómez Fernández</h1>
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;
