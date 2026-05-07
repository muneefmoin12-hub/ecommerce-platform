'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@ecommerce/ui';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigateTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2,
  );

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => navigateTo(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, i) => (
        <div key={page} className="flex items-center">
          {i > 0 && pages[i - 1] !== undefined && page - (pages[i - 1] as number) > 1 && (
            <span className="px-2 text-muted-foreground">…</span>
          )}
          <Button
            variant={page === currentPage ? 'default' : 'outline'}
            size="icon"
            onClick={() => navigateTo(page)}
          >
            {page}
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => navigateTo(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
