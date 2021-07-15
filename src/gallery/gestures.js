const scaleMin = 1
const scaleMax = 2
const clientWidth = window.innerWidth
const clientHeight = window.innerHeight
const temp = {
	screenX: null,
	originalMarginLeft: null,
	currentMarginLeft: null,
	originalTransition: null,
	imgOriginalTransition: null,
	durationStart: null,
	translateX: 0,
	translateY: 0,
	clientX: null,
	clientY: null
}
let evCache = []
let prevDiff = -1
let zoomedIn = false

const grabImageFromEvent = ( e ) => {
	return e.target.nodeName === 'IMG' ? e.target : e.target.querySelector( 'img' )
}

const grabScaleFromTransform = ( transform ) => {
	return Number( transform.slice( transform.indexOf( 'scale' ) + 6, -1 ) )
}

const isInvalidEvent = ( e, prefixClassname ) => {
	const invalidClasses = [
		`${prefixClassname}-item-caption`,
		`${prefixClassname}-item-caption-expand-cue`,
		`${prefixClassname}-item-caption-text`,
		`${prefixClassname}-button`
	]

	const invalidElement = invalidClasses.find( className => {
		return e.target.className.indexOf( className ) > -1
	} )

	return e.pointerType !== 'touch' || invalidElement
}

const isImgZoomedIn = () => {
	return zoomedIn
}

const getFingerAmount = () => {
	return evCache.length
}

const removeEvent = ( e ) => {
	for ( let i = 0; i < evCache.length; i++ ) {
		if ( evCache[ i ].pointerId === e.pointerId ) {
			evCache.splice( i, 1 )
			break
		}
	}
}

const clearZoom = ( image ) => {
	if ( image ) {
		image.style.transform = `scale(${scaleMin})`
		zoomedIn = false
	}
}

const toggleZoom = ( e ) => {
	const image = grabImageFromEvent( e )
	temp.clientX = null
	temp.clientY = null
	temp.translateX = 0
	temp.translateY = 0

	if ( isImgZoomedIn() ) {
		image.style.transform = `scale(${scaleMin})`
		zoomedIn = false
	} else {
		image.style.transform = `scale(${scaleMax})`
		zoomedIn = true
	}
}

const zoomStart = ( e ) => {
	const image = grabImageFromEvent( e )
	const imageStyle = window.getComputedStyle( image )
	temp.imgOriginalTransition = imageStyle.transition
	evCache.push( e )
}

const zoomMove = ( e ) => {
	const image = grabImageFromEvent( e )
	const transform = image.style.transform
	const delta = 0.1
	const buffer = 0.3
	let scale = transform ? grabScaleFromTransform( transform ) : scaleMin

	for ( let i = 0; i < evCache.length; i++ ) {
		if ( e.pointerId === evCache[ i ].pointerId ) {
			evCache[ i ] = e
			break
		}
	}

	if ( evCache.length === 2 ) {
		let curDiff = Math.abs( evCache[ 0 ].clientX - evCache[ 1 ].clientX )

		if ( prevDiff > 0 ) {
			if ( curDiff > prevDiff ) {
				zoomedIn = true
				if ( scale + delta < scaleMax ) {
					// Expand image
					scale += delta
					image.style.transform = `scale(${scale})`
				}
			}
			if ( curDiff < prevDiff ) {
				if ( scale - delta - buffer > scaleMin ) {
					// Contract image
					scale -= delta
					image.style.transform = `scale(${scale})`
				} else {
					image.style.transform = `scale(${scaleMin})`
					zoomedIn = false
				}
			}
		}

		prevDiff = curDiff
	}
}

const zoomScroll = ( e, renderNext, items, current ) => {
	const image = grabImageFromEvent( e )
	const transform = image.style.transform
	const scale = transform ? grabScaleFromTransform( transform ) : scaleMin
	const isImgLandscape = image.naturalHeight <= image.naturalWidth
	const horizontalLimit = clientWidth / 2
	const verticalLimit = isImgLandscape ? clientHeight / 8 : clientHeight / 2
	const paddingOffset = 80

	image.style.transition = 'unset'
	if ( !temp.clientX || !temp.clientY ) {
		temp.clientX = e.clientX
		temp.clientY = e.clientY
	}

	const translateX = temp.translateX + ( e.clientX - temp.clientX )
	const translateY = temp.translateY + ( e.clientY - temp.clientY )

	if ( Math.abs( translateX ) < horizontalLimit && Math.abs( translateY ) < verticalLimit ) {
		temp.translateX = translateX
		temp.translateY = translateY
		temp.clientX = e.clientX
		temp.clientY = e.clientY
		image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale})`
	} else if ( Math.abs( translateX ) > horizontalLimit + paddingOffset ) {
		if ( translateX > 0 && items[ current - 1 ] ) {
			renderNext( -1 )
			clearZoom( image )
		} else if ( translateX < 0 && items[ current + 1 ] ) {
			renderNext( 1 )
			clearZoom( image )
		}
	}
}

const zoomEnd = ( e ) => {
	const image = grabImageFromEvent( e )
	if ( image ) {
		image.style.transition = temp.imgOriginalTransition
	}
	removeEvent( e )
	temp.clientX = null
	temp.clientY = null
	if ( evCache.length < 2 ) {
		prevDiff = -1
	}
}

const slideStart = ( e, container, marginLR ) => {
	const containerStyle = window.getComputedStyle( container )
	temp.durationStart = Date.now()
	temp.screenX = e.clientX
	temp.originalMarginLeft =
            +containerStyle[ marginLR ].slice( 0, -2 )
	temp.currentMarginLeft =
            +containerStyle[ marginLR ].slice( 0, -2 )
	temp.originalTransition = containerStyle.transition
	container.style.transition = 'unset'
}

const slideMove = ( e, container, marginLR, dir ) => {
	const clientX = e.clientX
	const offset = clientX - temp.screenX
	temp.currentMarginLeft = temp.originalMarginLeft + offset * ( dir === 'ltr' ? 1 : -1 )
	container.style[ marginLR ] = temp.currentMarginLeft + 'px'
	e.preventDefault()
}

const slideEnd = ( e, container, renderNext, marginLR, current ) => {
	const diff = temp.originalMarginLeft - temp.currentMarginLeft
	const duration = Date.now() - temp.durationStart
	if ( Math.abs( diff / clientWidth ) > 0.4 ||
    ( duration <= 300 && Math.abs( diff ) > 5 )
	) {
		renderNext( diff > 0 ? 1 : -1 )
	} else {
		container.style[ marginLR ] = -clientWidth * current + 'px'
	}

}

export {
	temp, isInvalidEvent, isImgZoomedIn,
	getFingerAmount, toggleZoom, clearZoom,
	zoomStart, zoomMove, zoomScroll, zoomEnd,
	slideStart, slideMove, slideEnd
}
