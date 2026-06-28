import type { Components } from 'react-markdown'
import SmartImg from '../components/SmartImg'

// Replace every <img> in the rendered preview with SmartImg, which routes
// stat services through the proxy and shows an empty-state + reason on failure.
export const MD_COMPONENTS: Components = {
  img: ({ src, alt, width, height }) => (
    <SmartImg src={typeof src === 'string' ? src : ''} alt={alt ?? ''} width={width} height={height} />
  ),
}
