<?php
/**
 * Title: Dignidad Guatemala — Portada Natural y Comunitaria
 * Slug: dignidad-guatemala/portada-comunitaria
 * Categories: featured, banner, call-to-action
 * Keywords: dignidad, guatemala, comunidad, propuestas, afiliacion
 * Block Types: core/post-content
 * Viewport Width: 1280
 * Description: Patrón de portada inspirado en rbp-portfolio y Casa San Miguel con tipografía editorial, tarjetas limpias y opciones claras de participación.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"base","textColor":"contrast","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-contrast-color has-base-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">

	<!-- wp:columns {"align":"wide","verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60"}}}} -->
	<div class="wp-block-columns alignwide are-vertically-aligned-center">

		<!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
			<!-- wp:paragraph {"textColor":"primary","fontSize":"small"} -->
			<p class="has-primary-color has-text-color has-small-font-size"><?php esc_html_e( 'Partido Político #28 · Guatemala', 'dignidad-guatemala' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":1,"fontSize":"xx-large","fontFamily":"heading","style":{"typography":{"lineHeight":"1.06"}}} -->
			<h1 class="wp-block-heading has-heading-font-family has-xx-large-font-size" style="line-height:1.06"><?php esc_html_e( 'Un movimiento nacido de nuestra propia gente.', 'dignidad-guatemala' ); ?></h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"fontSize":"large"} -->
			<p class="has-large-font-size"><?php esc_html_e( 'Caminamos junto a las comunidades, agricultores, mujeres y jóvenes de los 22 departamentos para devolverle la dignidad, el agua y la justicia a Guatemala.', 'dignidad-guatemala' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
			<div class="wp-block-buttons">
				<!-- wp:button {"backgroundColor":"primary","textColor":"base","style":{"border":{"radius":"12px"}}} -->
				<div class="wp-block-button"><a class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" href="/afiliate" style="border-radius:12px"><?php esc_html_e( 'Afíliate en tu departamento', 'dignidad-guatemala' ); ?></a></div>
				<!-- /wp:button -->

				<!-- wp:button {"className":"is-style-outline","style":{"border":{"radius":"12px"}}} -->
				<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/ejes" style="border-radius:12px"><?php esc_html_e( 'Conoce nuestras propuestas', 'dignidad-guatemala' ); ?></a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"45%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
			<!-- wp:image {"sizeSlug":"large","style":{"border":{"radius":"24px"}}} -->
			<figure class="wp-block-image size-large has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'public/media/social/photos/asamblea-liderazgos-agua.jpg' ) ); ?>" alt="<?php esc_attr_e( 'Asamblea comunitaria de liderazgos de Dignidad Guatemala', 'dignidad-guatemala' ); ?>" style="border-radius:24px"/></figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->

	</div>
	<!-- /wp:columns -->

</div>
<!-- /wp:group -->

