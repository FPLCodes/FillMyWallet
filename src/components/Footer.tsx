export default function Footer() {
  return (
    <footer className="bg-card py-5 mt-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FillMyWallet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
