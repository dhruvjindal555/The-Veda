type Props = {
  suggestions: string[]
  loading: boolean
  onSelect: (s: string) => void
}

export default function FollowUpSuggestions({ suggestions, loading, onSelect }: Props) {
  if (!loading && suggestions.length === 0) return null

  return (
    <div className="mt-5 ml-16">
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-chalk animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-chalk animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-chalk animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="font-sans text-xs tracking-widest uppercase text-chalk">
            Generating follow-ups...
          </p>
        </div>
      ) : (
        <>
          <p className="font-sans text-xs tracking-widest uppercase text-chalk mb-2">
            Continue the inquiry
          </p>
          <div className="flex flex-col gap-1.5">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onSelect(s)}
                className="text-left px-4 py-2 border border-chalk bg-paper font-garamond text-sm text-stone cursor-pointer transition-all duration-150 hover:bg-crimson hover:text-paper hover:border-crimson"
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}