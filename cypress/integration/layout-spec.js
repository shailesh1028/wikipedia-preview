import { Preview } from '../page-objects/preview'
import { goOffline, goOnline } from '../page-objects/helpers/network'

const preview = new Preview()

describe( 'Check the layout', () => {

	beforeEach( 'Open the English Page', () => {
		cy.navigateToHomePage( '/articles/test.html' )
	} )

	it( 'Check the Wikipedia Preview in Standard with Image Layout', () => {
		preview.getPreviewSpan().eq( 0 ).click()

		preview.checkPreviewStandard()

		preview.getHeaderClosebtn().click()
	} )

	it.skip( 'Check the Wikipedia Preview in Offline Layout', () => {
		goOffline()

		preview.getPreviewSpan().eq( 0 ).click()

		preview.checkPreviewOffline()

		preview.getHeaderClosebtn().click()

		goOnline()
	} )

	it( 'Check the Wikipedia Preview in Error Layout', () => {
		preview.getPreviewSpan().eq( 1 ).click()

		preview.checkPreviewError()

		preview.getHeaderClosebtn().click()
	} )

	it( 'Check the Wikipedia Preview in Disambiguation Layout', () => {
		preview.getPreviewSpan().eq( 2 ).click()

		preview.checkPreviewDisambiguation()

		preview.getHeaderClosebtn().click()
	} )

} )
