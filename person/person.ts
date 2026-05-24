namespace $ {

	export class $bog_talks_person extends $giper_baza_entity.with({
		Name: $giper_baza_atom_text,
		Background: $giper_baza_atom_text,
		Avatar: $giper_baza_atom_text,
		Chats: $giper_baza_list_link,
		Last_seen: $giper_baza_dict_to( $giper_baza_atom_link ),
	}) {

		get id() { return this.land_link().str as $mol_int62_string }

		state(): $hyoo_crowd_struct {
			throw new Error( 'Use Giper Baza API' )
		}

		domain() {
			return this.$.$hyoo_talks_domain
		}

		name( next?: string ) {
			return this.Name( next )?.val( next ) ?? ''
		}

		background( next?: string ) {
			return this.Background( next )?.val( next ) ?? ''
		}

		avatar( next?: string ) {
			return this.Avatar( next )?.val( next ) ?? ''
		}

		online_near() {
			const moment = this.online_time()
			if( !moment ) return false
			const now = this.$.$mol_state_time.now( 60_000 )
			return ( now - moment.valueOf() < 60_000 )
		}

		online_time() {
			return this.last_change()
		}

		chats(): readonly $bog_talks_chat[] {
			const links = this.Chats()?.items() ?? []
			return links
				.filter( $mol_guard_defined )
				.map( link => this.$.$bog_talks_domain.Chat( link ) )
		}

		chat_watch( chat: $bog_talks_chat, next?: boolean ) {
			const list = this.Chats( null )!
			const link = chat.land_link()
			if( next === undefined ) return list.has( link )
			if( next ) list.add( link )
			else list.cut( link )
			return next
		}

		last_seen_message( chat: $bog_talks_chat, next?: $bog_talks_message ): $bog_talks_message | null {
			const dict = this.Last_seen( next !== undefined ? null : undefined )
			if( !dict ) return null

			const key = chat.land_link().str

			if( next !== undefined ) {
				const atom = dict.key( key, null )
				if( atom ) atom.vary( next?.link() ?? null )
				return next ?? null
			}

			const atom = dict.key( key )
			if( !atom ) return null

			const link = atom.val()
			return link ? this.$.$bog_talks_domain.Message( link ) : null
		}

	}

}
