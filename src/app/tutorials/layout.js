
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";


export default function RootLayout({ children }) {
  return (
    <div>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
    </div>
  );
}
