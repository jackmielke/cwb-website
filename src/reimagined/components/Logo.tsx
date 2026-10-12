import { img } from '../../lib/img'

export function Logo({ className = 'h-11' }: { className?: string }) {
  return <img src={img('cwb-logo.png')} alt="The Center for Wooden Boats" className={`${className} w-auto block`} />
}
