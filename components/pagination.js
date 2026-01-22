'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, Link } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'

export default function Pagination({ current_page, total_pages }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Generate page URL with updated page number
    const getPageUrl = (page) => {
        const params = new URLSearchParams(searchParams.toString())
        if (page === 1) {
            params.delete('page')
        } else {
            params.set('page', page.toString())
        }
        const queryString = params.toString()
        return queryString ? `${pathname}?${queryString}` : pathname
    }

    // Calculate which page numbers to show
    const getPageNumbers = () => {
        const pages = []

        // Show n-2, n-1, n, n+1, n+2
        for (let i = current_page - 2; i <= current_page + 2; i++) {
            if (i >= 1 && i <= total_pages) {
                pages.push(i)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()
    const canGoPrev = current_page > 1
    const canGoNext = current_page < total_pages

    if (total_pages <= 1) {
        return null
    }

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            {/* Previous Button */}
            <Link
                href={canGoPrev ? getPageUrl(current_page - 1) : '#'}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${canGoPrev
                    ? 'bg-[#446A2A] text-white shadow-[0px_2px_0px_rgba(57,83,39,1)] hover:shadow-[0px_1px_0px_rgba(57,83,39,1)] hover:translate-y-[1px] active:shadow-none active:translate-y-[2px]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                aria-disabled={!canGoPrev}
                onClick={(e) => !canGoPrev && e.preventDefault()}
            >
                <ChevronLeft size={20} />
            </Link>

            {/* Page Numbers */}
            {pageNumbers.map((page) => {
                const isActive = page === current_page

                return (
                    <Link
                        key={page}
                        href={getPageUrl(page)}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg font-semibold text-sm transition-all ${isActive
                            ? 'bg-white text-[#446A2A] border-2 border-[#446A2A]'
                            : 'bg-[#446A2A] text-white shadow-[0px_2px_0px_rgba(57,83,39,1)] hover:shadow-[0px_1px_0px_rgba(57,83,39,1)] hover:translate-y-[1px] active:shadow-none active:translate-y-[2px]'
                            }`}
                    >
                        {page}
                    </Link>
                )
            })}

            {/* Next Button */}
            <Link
                href={canGoNext ? getPageUrl(current_page + 1) : '#'}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${canGoNext
                    ? 'bg-[#446A2A] text-white shadow-[0px_2px_0px_rgba(57,83,39,1)] hover:shadow-[0px_1px_0px_rgba(57,83,39,1)] hover:translate-y-[1px] active:shadow-none active:translate-y-[2px]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                aria-disabled={!canGoNext}
                onClick={(e) => !canGoNext && e.preventDefault()}
            >
                <ChevronRight size={20} />
            </Link>
        </div>
    )
}
