import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';

export default function Pagination({
  currentPage,
  totalPages,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
  dir = 'ltr',
  perPageOptions = [10, 25, 50, 100]
}) {
  const isRtl = dir === 'rtl';
  const showNav = totalPages > 1;

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 sm:gap-4 py-4 px-2">
      <div className="flex items-center gap-3">
        <span className="text-sm text-on-surface-subtle">Show</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="bg-surface-light border-none rounded-lg px-3 py-2 text-sm font-medium text-brand-primary"
        >
          {perPageOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className="text-sm text-on-surface-subtle">of {total} entries</span>
      </div>

      {showNav && (
        <nav className="flex items-center gap-1" aria-label="Pagination">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-light disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <MaterialSymbol icon={isRtl ? "last_page" : "first_page"} size={20} />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-light disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <MaterialSymbol icon={isRtl ? "chevron_right" : "chevron_left"} size={20} />
          </button>

          <div className="flex items-center gap-1 mx-1 sm:mx-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-md shadow-brand-primary/20'
                      : 'hover:bg-surface-light text-on-surface-variant'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-light disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <MaterialSymbol icon={isRtl ? "chevron_left" : "chevron_right"} size={20} />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-light disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <MaterialSymbol icon={isRtl ? "first_page" : "last_page"} size={20} />
          </button>
        </nav>
      )}
    </div>
  );
}
