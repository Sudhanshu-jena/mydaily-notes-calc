const Privacy = () => (
  <div className="container max-w-3xl py-12">
    <div className="animate-fade-in prose prose-sm max-w-none">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Information We Collect</h2>
          <p>We collect information you provide when creating an account, including your name, email address, and any profile information you choose to share. We also collect usage data to improve our services.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">How We Use Your Information</h2>
          <p>Your information is used to provide and improve our services, communicate with you, and ensure the security of your account. We never sell your personal data to third parties.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Data Security</h2>
          <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest. Your passwords are hashed and never stored in plain text.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time through your profile settings. You can also request a copy of all data we hold about you.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
          <p>If you have questions about this privacy policy, please contact us at privacy@myapp.com.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Privacy;
