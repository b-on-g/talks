namespace $.$$ {

	export class $bog_talks_chat_page extends $.$bog_talks_chat_page {

		domain() {
			return this.$.$bog_talks_domain
		}

		chat() {
			const id = this.chat_id() as string
			return this.domain().Chat( new this.$.$giper_baza_link( id ) )
		}

		title( next?: string ) {
			return this.chat().title( next )
		}

		@ $mol_mem
		messages() {
			new $mol_after_frame( $mol_wire_async( () => {
				if( this.Bubbles().gap_after() === 0 ) {
					this.scroll_end()
				}
			} ) )
			return this.chat().messages()
		}

		message( id: string ) {
			return this.domain().Message( new this.$.$giper_baza_link( id ) )
		}

		@ $mol_mem
		bubbles() {
			return this.messages().map( ( msg: $bog_talks_message ) => this.Bubble( msg.id ) )
		}

		@ $mol_mem
		joined( next?: boolean ) {
			this.$.$mol_notify.allowed( true )
			return this.domain().User().chat_watch( this.chat(), next )
		}

		draft_key() {
			return `$bog_talks_chat.draft.${ this.chat_id() }`
		}

		@ $mol_mem
		draft_text( next?: string ) {
			const value = this.$.$mol_state_local.value( this.draft_key(), next )
			return ( typeof value === 'string' ) ? value : ''
		}

		draft_send() {
			const text = this.draft_text().trim()
			if( !text ) return

			const chat = this.chat()
			const msg = chat.message_new()
			msg.text( text )

			this.draft_text( '' )

			this.$.$mol_wait_rest()
			this.scroll_end()

			this.joined( true )
		}

		body_scroll_top( next?: number ) {
			const key = `${ this }.body_scroll_top()`
			return this.$.$mol_state_local.value( key, next )
				?? Number.MAX_SAFE_INTEGER
		}

		scroll_end() {
			this.Body().scroll_top( this.Body().dom_node().scrollHeight )
		}

		@ $mol_mem
		update_last_seen_message() {
			const all = this.messages()
			let bottom = this.Bubbles().view_window()[1] - 1
			const user = this.domain().User()

			const last_seen = user.last_seen_message( this.chat() )
			if( last_seen ) {
				const idx = all.findIndex( ( m: $bog_talks_message ) => m.id === last_seen.id )
				if( idx >= bottom ) return
			}

			if( bottom >= 0 && bottom < all.length ) {
				user.last_seen_message( this.chat(), all[ bottom ] )
			}
		}

		dump_blob() {
			const messages = this.chat().messages()
			const lines = messages.map( ( msg: $bog_talks_message ) => {
				return [
					msg.author()?.name() || msg.author()?.id || '',
					msg.text() ?? '',
					msg.changed()?.toString( 'YYYY-MM-DD hh:mm:ss' ) ?? '',
				].map( v => JSON.stringify( v ) ).join( '\t' )
			} )
			const tsv = [ 'Name\tMessage\tMoment', ... lines ].join( '\n' )
			return new Blob( [ tsv ], { type: 'text/tab-separated-values' } )
		}

		dump_name() {
			const name = this.chat().title() || this.chat().id || 'chat'
			return name + '.csv'
		}

		hearing( next?: boolean ) {
			return this.$.$mol_speech.hearing( next )
		}

		@ $mol_mem
		is_owner() {
			const land = this.chat().land()
			const my_pass = this.$.$giper_baza_auth.current().pass()
			return land.pass_rank( my_pass ) >= this.$.$giper_baza_rank_rule
		}

		@ $mol_mem
		rights_panel() {
			if( !this.is_owner() ) return []
			return [ this.Rights() ]
		}

		Rights() {
			const land = this.chat().land()
			const rights = super.Rights()
			rights.land = () => land
			return rights
		}

		@ $mol_mem
		@ $mol_action
		autoscroll() {
			const user = this.domain().User()
			const message = user.last_seen_message( this.chat() )
			if( !message ) return
			this.ensure_visible( this.Bubble( message.id ), 'end' )
		}

		@ $mol_mem
		auto_join() {
			this.joined( true )
			return null
		}

		auto() {
			this.auto_join()
			this.autoscroll()
			this.update_last_seen_message()
		}

	}

	$mol_view_component( $bog_talks_chat_page )

}
