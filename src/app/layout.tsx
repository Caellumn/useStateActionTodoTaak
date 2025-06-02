import "./globals.css";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </>
  );
};
export default layout;
