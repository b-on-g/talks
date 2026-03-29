namespace $.$$ {

	export class $bog_talks extends $.$bog_talks {

		domain() {
			return this.$.$bog_talks_domain
		}

		chat_id_current() {
			return this.$.$mol_state_arg.value( 'chat' ) ?? ''
		}

		User() {
			return this.domain().User()
		}

		chat( id: string ) {
			return this.domain().Chat( new this.$.$giper_baza_link( id ) )
		}

		person( id: string ) {
			return this.domain().Person( new this.$.$giper_baza_link( id ) )
		}

		background() {
			const uri = this.User().background()
			const shade = `hsl( var(--mol_theme_hue), 0% , calc( 50% + 50% * var(--mol_theme_luma) ), .8 )`
			return uri ? `linear-gradient( ${shade}, ${shade} ), url(${ JSON.stringify( uri ) })` : shade
		}

		roster_body() {
			return [
				... this.User().chats().length > 1 ? [ this.Links_query() ] : [],
				this.Links(),
			]
		}

		@ $mol_mem
		links() {
			return this.User().chats()
				.filter( $mol_match_text( this.links_query(), ( chat: $bog_talks_chat ) => [ chat.title() ] ) )
				.map( ( chat: $bog_talks_chat ) => this.Chat_link( chat.id ) )
				.reverse()
		}

		@ $mol_mem_key
		chat_title( id: string ) {
			return this.chat( id ).title() || this.unnamed()
		}

		chat_arg( id: string ) {
			return { chat: id }
		}

		chat_new() {
			const chat = this.domain().chat_new()
			this.User().chat_watch( chat, true )
			this.$.$mol_dom_context.location.href = '#!chat=' + chat.id
		}

		@ $mol_mem_key
		chat_unread_count( id: string ) {
			return this.chat( id ).unread_count()
		}

		@ $mol_mem_key
		message_notify( chat: $bog_talks_chat ) {
			if( !this.chat_unread_count( chat.id ) ) return null
			this.$.$mol_notify.show({
				context: `${ chat.title() }`,
				message: this.new_message(),
				uri: this.$.$mol_state_arg.link({ chat: chat.id })
			})
			return null
		}

		chat_link_sub( id: string ) {
			return [
				... this.chat_unread_count( id ) === 0 ? [] : [ this.Chat_unread_count( id ) ],
				this.Chat_link_title( id ),
			]
		}

	}

}
