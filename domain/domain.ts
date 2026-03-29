namespace $ {

	export class $bog_talks_domain extends $mol_object {

		static yard() {
			return this.$.$giper_baza_glob.yard()
		}

		static User(): $bog_talks_person {
			const lord = this.$.$giper_baza_auth.current().pass().lord()
			return this.Person( lord )
		}

		static Person( lord: $giper_baza_link ): $bog_talks_person {
			return this.$.$giper_baza_glob.Land( lord ).Data( $bog_talks_person )
		}

		static Chat( link: $giper_baza_link ): $bog_talks_chat {
			return this.$.$giper_baza_glob.Land( link ).Data( $bog_talks_chat )
		}

		@ $mol_action
		static chat_new(): $bog_talks_chat {
			const land = this.$.$giper_baza_glob.land_grab([
				[ null, this.$.$giper_baza_rank_post( 'late' ) ]
			])
			return land.Data( $bog_talks_chat )
		}

		static Message( link: $giper_baza_link ): $bog_talks_message {
			return this.$.$giper_baza_glob.Land( link ).Data( $bog_talks_message )
		}

		@ $mol_action
		static message_new(): $bog_talks_message {
			const land = this.$.$giper_baza_glob.land_grab([
				[ null, this.$.$giper_baza_rank_read ]
			])
			return land.Data( $bog_talks_message )
		}

	}

}
