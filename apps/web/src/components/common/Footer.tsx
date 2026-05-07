import Link from 'next/link';

const footerLinks = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?tag=new', label: 'New Arrivals' },
    { href: '/products?tag=sale', label: 'Sale' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
  ],
  Support: [
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Policy' },
    { href: '/returns', label: 'Returns' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-semibold text-sm mb-4">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Secure payments</span>
            <div className="flex gap-2">
              {['Visa', 'Mastercard', 'Stripe'].map((p) => (
                <span key={p} className="text-xs border rounded px-2 py-1 text-muted-foreground">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
