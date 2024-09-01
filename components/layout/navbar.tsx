"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import { Github } from "@/components/shared/icons";
import { Session } from "next-auth";
import PlaidLinkButton from "@/components/home/plaid";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Patriot</p>
          </Link>
          <PlaidLinkButton />
          <div
              className="flex animate-fade-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              
              <a
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-black px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
                href="https://github.com/ByrgenwerthScholar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                <p>
                  <span className="hidden sm:inline-block text-white">View on GitHub</span>
                </p>
              </a>
            </div>
        </div>
      </div>
    </>
  );
}
