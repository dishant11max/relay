'use client'

import { useState, useMemo } from 'react'
import FilterBar from './FilterBar'
import PortfolioGrid from './PortfolioGrid'
import { MOCK_PORTFOLIOS } from './mockData'

export default function BrowseClientShell() {
  const [search,      setSearch]      = useState('')
  const [activeStack, setActiveStack] = useState('All')
  const [sortBy,      setSortBy]      = useState('latest')

  const filtered = useMemo(() => {
    let result = [...MOCK_PORTFOLIOS]

    // Stack filter
    if (activeStack !== 'All') {
      result = result.filter((p) => p.stack.includes(activeStack))
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter((p) => p.username.toLowerCase().includes(q))
    }

    // Sort
    if (sortBy === 'ats') {
      result.sort((a, b) => b.ats - a.ats)
    } else if (sortBy === 'repos') {
      result.sort((a, b) => b.repos - a.repos)
    }
    // 'latest' = original order (index), already preserved by spread

    return result
  }, [search, activeStack, sortBy])

  const clearFilters = () => {
    setSearch('')
    setActiveStack('All')
    setSortBy('latest')
  }

  return (
    <>
      <FilterBar
        search={search}
        setSearch={setSearch}
        activeStack={activeStack}
        setActiveStack={setActiveStack}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Result count */}
      <div style={{ padding: '12px var(--page-px) 0' }}>
        <span className="font-mono text-muted" style={{ fontSize: 13 }}>
          Showing {filtered.length} portfolio{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <PortfolioGrid portfolios={filtered} />
      ) : (
        <div
          style={{
            padding: '60px var(--page-px)',
            textAlign: 'center',
          }}
        >
          <p className="font-mono text-muted-2" style={{ fontSize: 16, marginBottom: 20 }}>
            No portfolios match your filter.
          </p>
          <button
            onClick={clearFilters}
            className="font-mono font-bold text-muted-2"
            style={{
              fontSize: 13,
              padding: '8px 20px',
              background: 'transparent',
              border: '1px solid #737373',
              cursor: 'pointer',
              letterSpacing: '0.06em',
              transition: 'border-color 150ms, color 150ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#4afe80'
              e.currentTarget.style.color = '#4afe80'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#737373'
              e.currentTarget.style.color = '#a3a3a3'
            }}
          >
            CLEAR FILTERS
          </button>
        </div>
      )}
    </>
  )
}
