namespace $ {

	export class $bog_talks_chat extends $giper_baza_entity.with({
		Messages: $giper_baza_list_link.to( ()=> $bog_talks_message ),
	}) {

		get id() { return this.land_link().str as $mol_int62_string }

		state(): $hyoo_crowd_struct {
			throw new Error( 'Use Giper Baza API' )
		}

		domain() {
			return this.$.$hyoo_talks_domain
		}

		messages(): $bog_talks_message[] {
			const links = this.Messages()?.items() ?? []
			return links
				.filter( $mol_guard_defined )
				.map( link => this.$.$bog_talks_domain.Message( link ) )
		}

		/** Creates a new message pawn embedded in this chat's land. */
		@ $mol_action
		message_new(): $bog_talks_message {
			return this.Messages( null )!.make( null ) as $bog_talks_message
		}

		/**
		 * Adds an existing message (typically a legacy standalone-land message) to this chat.
		 * Kept for type compatibility with $hyoo_talks_chat.
		 */
		message_add( msg: $bog_talks_message ) {
			this.Messages( null )!.add( msg.link() )
		}

		/**
		 * Drafts now live in $mol_state_local (per-device, not synced).
		 * Methods kept as stubs for type compatibility with $hyoo_talks_chat.
		 */
		draft( next?: null | $bog_talks_message ): $bog_talks_message | null {
			return null
		}

		draft_new(): $bog_talks_message {
			return this.message_new()
		}

		unread_count() {
			const all = this.messages()
			if( !all.length ) return 0

			const last = this.$.$bog_talks_domain.User().last_seen_message( this )
			if( !last ) return all.length

			const idx = all.findIndex( m => m.id === last.id )
			if( idx < 0 ) return all.length

			return all.length - idx - 1
		}

	}

}
