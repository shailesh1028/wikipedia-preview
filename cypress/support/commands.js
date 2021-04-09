Cypress.Commands.add('navigateToHomePage', (url='') => {
  cy.visit(''+url)
})

Cypress.Commands.add('ImageUrlCheck', ($tag)=>{

	const url = $tag.css('background-image')
	let $flag = true
	if(url.length<=5)
		$flag = false
	expect($flag).to.be.true
})
