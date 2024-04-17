// import {
//   generateUploadButton,
//   generateUploadDropzone,
// } from "@uploadthing/react";

import type { OurFileRouter } from "../apis/uploadthing/core";

// export const UploadButton = generateUploadButton<OurFileRouter>();
// export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

import { generateUploadButton } from "@uploadthing/react";
 
export const UploadButton = generateUploadButton<OurFileRouter>();