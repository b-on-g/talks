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
			return this.$.$giper_baza_glob.Land( link.land() ).Data( $bog_talks_chat )
		}

		/** Encrypted private chat. Owner has rule, world is denied. Invite peers via land.give. */
		@ $mol_action
		static chat_new(): $bog_talks_chat {
			const auth = this.$.$giper_baza_auth.current()
			const land = this.$.$giper_baza_glob.land_grab([
				[ auth.pass(), this.$.$giper_baza_rank_rule ]
			])
			land.encrypted( true )
			return land.Data( $bog_talks_chat )
		}

		/**
		 * Resolves a message link to a message pawn.
		 * Embedded (4-part link with head) → glob.Pawn; legacy standalone land → Land.Data.
		 */
		static Message( link: $giper_baza_link ): $bog_talks_message {
			if( link.head().str ) {
				return this.$.$giper_baza_glob.Pawn( link, $bog_talks_message ) as $bog_talks_message
			}
			return this.$.$giper_baza_glob.Land( link ).Data( $bog_talks_message )
		}

	}

}
