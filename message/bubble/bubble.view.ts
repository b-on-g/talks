namespace $.$$ {

	export class $bog_talks_message_bubble extends $.$bog_talks_message_bubble {

		domain() {
			return this.$.$bog_talks_domain
		}

		text( next?: string ) {
			return this.message().text( next )
		}

		author() {
			return this.message().author()!
		}

		@ $mol_mem
		side() {
			const author = this.message().author()
			if( !author ) return 'other'
			return author.id === this.domain().User().id ? 'self' : 'other'
		}

		@ $mol_mem
		editable( next?: boolean ) {
			if( next !== undefined ) return next
			return this.side() === 'self'
		}

		moment() {
			return this.message().changed()?.toString( 'YYYY-MM-DD hh:mm' ) ?? ''
		}

	}

}
