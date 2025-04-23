'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import S1 from "./components/home/S1";
import S2 from "./components/home/S2";
import S3 from "./components/home/S3";

export default function Home() {
  
  return (
    <>
      <S1 />
      <S2 />
      <S3 />
    </>
  );
}
