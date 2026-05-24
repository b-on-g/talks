namespace $ {

	export class $bog_talks_message extends $giper_baza_entity.with({
		Text: $giper_baza_atom_text,
	}) {

		get id() { return this.link().str as $mol_int62_string }

		state(): $hyoo_crowd_struct {
			throw new Error( 'Use Giper Baza API' )
		}

		domain() {
			return this.$.$hyoo_talks_domain
		}

		text( next?: string ) {
			return this.Text( next )?.val( next ) ?? ''
		}

		author(): $bog_talks_person | null {
			const passes = this.authors()
			if( !passes.length ) return null
			return this.$.$bog_talks_domain.Person( passes[0].lord() )
		}

		changed() {
			const moment = this.last_change()
			if( !moment ) return null
			return moment.toOffset( new $mol_time_moment().offset! )
		}

	}

}
