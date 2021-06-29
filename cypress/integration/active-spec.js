import { Preview } from '../page-objects/preview-page'

const preview = new Preview()

describe( 'Check the Hover and Click Event', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/english.html' )
	} )

	it( 'Check the Preview by hovering over the Span and click Close', () => {

		preview.getPreviewSpan().first().trigger( 'mouseenter', 'right' )

		preview.checkPreview()

		preview.getHeaderClosebtn().click()

	} )

	it( 'Check the Preview by Clicking over the Span and click Close', () => {

		preview.getPreviewSpan().first().click()

		preview.checkPreview()

		preview.getHeaderClosebtn().click()

	} )

} )
