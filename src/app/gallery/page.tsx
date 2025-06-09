import { Coverflow } from '../../components'
import { imageLinks } from '../../constants'

export default function Gallery() {
  return (
    <div className="overflow-y-hidden px-8">
      <Coverflow links={imageLinks} title="Coverflow Gallery" />
    </div>
  )
}
