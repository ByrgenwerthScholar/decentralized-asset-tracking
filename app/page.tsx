import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import Hyperledger from "@/components/layout/hyperledger";

export default async function Home() {
  

  return (
    <>
        <div className="z-10 w-full max-w-xl px-2">
            <h1
              className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-5xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              Explore the Safe Trading of Tomorrow
            </h1>
            <p
              className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              A Hyperledger Fabric Solution
            </p>
            <div
              className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              
              <a
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
                href="https://github.com/ByrgenwerthScholar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                <p>
                  <span className="hidden sm:inline-block">View on</span> GitHub{" "}
                </p>
              </a>
            </div>
        </div>
        <Hyperledger />
    </>
  );
}

