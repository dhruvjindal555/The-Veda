type Props = { label?: string }

export default function Divider({ label }: Props) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex-1 h-px bg-chalk" />
      {label && (
        <span className="font-sans text-xs tracking-widest uppercase text-chalk">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-chalk" />
    </div>
  )
}