/// <reference types="Cypress" />
describe("First Test", function(){
	it("Visit",function(){
		cy.visit('http://127.0.0.1:8080')
		cy.get('.item').first().click()
	})
	
	it("Visiting English",function(){
		cy.visit('http://127.0.0.1:8080')
		cy.get('.item').last().find('.subtitle').then(($url)=>{
			let lang = $url.text()
			lang = lang.replace("Language · ", "")
			lang = lang.toLowerCase().trim()
			cy.log(lang)
			$url.click()
		// 	// expect($url).to.have.string(lang)
			cy.location('pathname').should('contain',lang)

		})
		
	})

})

