namespace $ {

	export class $bog_talks_chat extends $giper_baza_entity.with({
		Messages: $giper_baza_list_link,
		Drafts: $giper_baza_dict_to( $giper_baza_atom_link ),
	}) {

		get id() { return this.land_link().str as $mol_int62_string }

		state(): $hyoo_crowd_struct {
			throw new Error( 'Use Giper Baza API' )
		}

		domain() {
			return this.$.$hyoo_talks_domain
		}

		// title() inherited from $giper_baza_entity

		messages(): $bog_talks_message[] {
			const links = this.Messages()?.items() ?? []
			return links
				.filter( $mol_guard_defined )
				.map( link => this.$.$bog_talks_domain.Message( link ) )
		}

		message_add( msg: $bog_talks_message ) {
			this.Messages( null )!.add( msg.land_link() )
		}

		draft( next?: null | $bog_talks_message ): $bog_talks_message | null {
			const user_lord = this.$.$bog_talks_domain.User().land_link()

			if( next === undefined ) {
				const dict = this.Drafts()
				if( !dict ) return null
				const atom = dict.key( user_lord.str )
				if( !atom ) return null
				const link = atom.val()
				return link ? this.$.$bog_talks_domain.Message( link ) : null
			}

			const dict = this.Drafts( null )!
			const atom = dict.key( user_lord.str, null )!

			if( next === null ) {
				atom.vary( null )
				return null
			}

			atom.val( next.land_link() )
			return next
		}

		draft_new() {
			return this.draft( this.$.$bog_talks_domain.message_new() )!
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
