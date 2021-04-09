describe("First Test", function(){

	
	it("Checking Each Link on index page based on language",function(){

		cy.visit('/index.html')

		// Checking all the link present in index which directs to right language page
		cy.get('.item').each(($div)=>{

			let str
			cy.wrap($div).find('.subtitle').then(($url)=>{

				let lang = $url.text()
				lang = lang.replace("Language · ", "")
				lang = lang.trim().replace(" ", "")				
				lang = lang.substr(0,1).toLowerCase() + lang.substr(1,lang.length)
				str = lang
				
			}).then(()=>{
				
				cy.wrap($div).find('a').should('have.attr', 'href').and('contain', str)
			})

		})

	})

})