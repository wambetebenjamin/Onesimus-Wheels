import type { Locale } from './types';
import { WHATSAPP_NUMBER } from './data';
type Section = { heading: string; body: string[] };
export function privacySections(locale: Locale): Section[] {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (locale === 'sw') return [
    { heading: 'Nani anayeendesha tovuti hii', body: [`Onesimus Wheels hutoa taarifa huru za baiskeli. Kwa maswali ya faragha, wasiliana nasi WhatsApp: +${WHATSAPP_NUMBER} (${wa}).`] },
    { heading: 'Hifadhi ya kifaa chako', body: ['Tunatumia kidakuzi cha lugha na kidakuzi cha ridhaa chenye jina onesimus-wheels-cookie-consent. Ukifungua wasifu wa kifaa, jina la kuonyesha na orodha ya vilivyohifadhiwa hukaa kwenye localStorage ya kivinjari chako. Hazitumwi kwa seva yetu na hazisawazishwi kati ya vifaa.', 'Unaweza kufuta wasifu na vilivyohifadhiwa kwenye ukurasa wa Saved, au kufuta data ya tovuti kwenye mipangilio ya kivinjari.'] },
    { heading: 'Fomu na reCAPTCHA', body: ['Fomu huandaa ujumbe wa WhatsApp. Hatuhifadhi maelezo ya fomu kwenye seva yetu. Uthibitishaji ukiwa umewashwa na ukakubali vidakuzi vya hiari, Google reCAPTCHA huchakata alama ya uthibitishaji na taarifa za kiufundi ili kuzuia taka. Sera ya faragha ya Google inatumika.', 'Bila uthibitishaji, unaweza kutuma ujumbe moja kwa moja WhatsApp. WhatsApp itachakata ujumbe kulingana na sera yake.'] },
    { heading: 'Hosting na viungo vya nje', body: ['Tovuti inahifadhiwa Vercel. Kumbukumbu za kiufundi za seva zinaweza kujumuisha anwani ya IP, muda na ukurasa ulioombwa kwa usalama na utendaji. Hatuendeshi uchanganuzi wa matangazo.', 'Viungo vya vyanzo, watoa huduma, WhatsApp na Pexels hufungua tovuti nyingine zenye sera zao. Picha ni za mfano na hazimaanisha uidhinishaji.'] },
    { heading: 'Uchaguzi wako', body: ['Unaweza kuchagua vidakuzi muhimu tu, kubadilisha chaguo kwenye footer, kuzima sauti ya kivinjari, au kutumia tovuti bila kuhifadhi chochote. Sauti ya ukurasa hutumia speech synthesis ya kivinjari na haitumi hati za sauti kwa seva.'] },
  ];
  if (locale === 'fr') return [
    { heading: 'Qui exploite ce site', body: [`Onesimus Wheels fournit des informations cyclistes indépendantes. Pour toute question de confidentialité, contactez-nous sur WhatsApp : +${WHATSAPP_NUMBER} (${wa}).`] },
    { heading: 'Stockage sur votre appareil', body: ['Nous utilisons un cookie de langue et un cookie de consentement nommé onesimus-wheels-cookie-consent. Si vous créez un profil local, le nom affiché et les favoris restent dans le localStorage de votre navigateur. Ils ne sont pas envoyés à notre serveur et ne se synchronisent pas.', 'Vous pouvez supprimer le profil et les favoris depuis la page Favoris, ou effacer les données du site dans votre navigateur.'] },
    { heading: 'Formulaires et reCAPTCHA', body: ['Les formulaires préparent un message WhatsApp. Nous ne stockons pas les détails du formulaire sur notre serveur. Si la vérification est active et acceptée, Google reCAPTCHA traite le jeton et des données techniques anti-spam. La politique de Google s’applique.', 'Sans vérification, vous pouvez envoyer directement sur WhatsApp, selon sa propre politique.'] },
    { heading: 'Hébergement et liens externes', body: ['Le site est hébergé par Vercel. Les journaux techniques peuvent inclure IP, date et page demandée pour la sécurité et le fonctionnement. Aucun suivi publicitaire.', 'Les sources, prestataires, WhatsApp et Pexels ont leurs propres politiques. Les photos sont illustratives et ne constituent pas un soutien.'] },
    { heading: 'Vos choix', body: ['Vous pouvez choisir les cookies essentiels, modifier ce choix en pied de page, désactiver la voix ou utiliser le site sans rien enregistrer. La voix utilise la synthèse du navigateur et n’envoie pas de script audio à notre serveur.'] },
  ];
  return [
    { heading: 'Who runs this site', body: [`Onesimus Wheels provides independent cycling information. For privacy questions, contact us on WhatsApp: +${WHATSAPP_NUMBER} (${wa}).`] },
    { heading: 'Storage on your device', body: ['We use a language cookie and a consent cookie named onesimus-wheels-cookie-consent. If you create a local profile, your display name and saved list stay in your browser localStorage. They are not sent to our server and do not sync between devices.', 'You can delete the profile and saved items on the Saved page, or clear site data in your browser settings.'] },
    { heading: 'Forms and reCAPTCHA', body: ['Forms prepare a WhatsApp message. We do not store form details on our server. When verification is enabled and you accept optional cookies, Google reCAPTCHA processes the verification token and technical anti-spam signals. Google’s privacy policy applies.', 'Without verification, you can send directly through WhatsApp, which processes messages under its own policy.'] },
    { heading: 'Hosting and external links', body: ['The site is hosted on Vercel. Technical server logs may include IP address, timestamp and requested page for security and operation. We do not run advertising analytics.', 'Source links, providers, WhatsApp and Pexels open other sites with their own policies. Photographs are illustrative and do not imply endorsement.'] },
    { heading: 'Your choices', body: ['You can choose essential-only cookies, change the choice in the footer, turn off browser voice, or use the site without saving anything. The voice tour uses browser speech synthesis and does not send audio scripts to our server.'] },
  ];
}
export function termsSections(locale: Locale): Section[] {
  if (locale === 'sw') return [
    { heading: 'Taarifa huru', body: ['Onesimus Wheels ni taarifa huru. Sio huduma ya matengenezo, muuzaji wa baiskeli, jukwaa la kuhifadhi nafasi wala mamlaka ya usafiri. Hatuthibitishi mafundi, ubora wa kazi, bei wala matokeo.'] },
    { heading: 'Usahihi wa orodha', body: ['Orodha zinatoka vyanzo vya umma na zinaweza kupitwa na wakati. Kukagua chanzo si ukaguzi wa eneo. Thibitisha saa, bei, upatikanaji, anwani na sheria na mtoa huduma kabla ya kusafiri. Baadhi ya orodha ni za majaribio au za zamani.'] },
    { heading: 'Uwajibikaji wa usalama', body: ['Unaendesha kwa hatari yako mwenyewe. Fuata sheria za eneo, valia kofia inapohitajika, kagua baiskeli na uchague njia salama. Mwongozo wetu ni wa jumla na haubadilishi mafunzo au ushauri wa kitaalamu. Kwa dharura, wasiliana na huduma za dharura za eneo.'] },
    { heading: 'Mapendekezo na maudhui', body: ['Ukituma pendekezo, unathibitisha una haki ya kushiriki maelezo hayo na kwamba yanaweza kupitiwa. Hatuahidi kuchapisha. Usitume taarifa nyeti. Picha ni za Pexels kwa leseni yake na ni za mfano.'] },
    { heading: 'Huduma za nje', body: ['Watoa huduma, WhatsApp, Google reCAPTCHA, Vercel na tovuti za vyanzo hufanya kazi chini ya masharti yao. Hatuwajibikii upatikanaji au vitendo vyao.'] },
    { heading: 'Mabadiliko', body: ['Tunaweza kusasisha orodha na masharti haya. Toleo la sasa liko hapa. Tarehe ya mwisho ya kusasisha ni 29 Oktoba 2026.'] },
  ];
  if (locale === 'fr') return [
    { heading: 'Information indépendante', body: ['Onesimus Wheels est un service d’information indépendant. Ni réparateur, ni vendeur, ni plateforme de réservation, ni autorité de transport. Nous ne certifions ni les mécaniciens, ni la qualité, ni les prix, ni les résultats.'] },
    { heading: 'Exactitude des fiches', body: ['Les fiches proviennent de sources publiques et peuvent être dépassées. Une consultation de source n’est pas une inspection. Confirmez horaires, prix, disponibilité, adresse et règles avec le prestataire. Certaines entrées sont pilotes ou historiques.'] },
    { heading: 'Responsabilité de sécurité', body: ['Vous roulez sous votre responsabilité. Respectez les règles locales, portez un casque si requis, vérifiez le vélo et choisissez un itinéraire sûr. Le guide est général et ne remplace pas une formation. En urgence, contactez les services locaux.'] },
    { heading: 'Propositions et contenu', body: ['En proposant une fiche, vous confirmez pouvoir partager ces détails pour vérification. La publication n’est pas garantie. N’envoyez pas d’informations sensibles. Les photos Pexels sont illustratives sous leur licence.'] },
    { heading: 'Services externes', body: ['Prestataires, WhatsApp, Google reCAPTCHA, Vercel et sources ont leurs propres conditions. Nous ne sommes pas responsables de leur disponibilité ou de leurs actes.'] },
    { heading: 'Évolution', body: ['Nous pouvons mettre à jour les fiches et conditions. La version actuelle est publiée ici. Dernière mise à jour : 29 octobre 2026.'] },
  ];
  return [
    { heading: 'Independent information', body: ['Onesimus Wheels is an independent information site. It is not a repair service, bike seller, booking platform or transport authority. We do not certify mechanics, workmanship, prices or outcomes.'] },
    { heading: 'Listing accuracy', body: ['Listings come from public sources and may be out of date. A source check is not an on-site inspection. Confirm hours, prices, availability, address and rules with the provider before travelling. Some entries are pilots or historical announcements.'] },
    { heading: 'Safety responsibility', body: ['You ride at your own risk. Follow local rules, wear a helmet where required, check your bike and choose a safe route. Our guide is general and does not replace training or professional advice. In an emergency, contact local emergency services.'] },
    { heading: 'Submissions and content', body: ['By submitting a suggestion, you confirm you can share those details for review. Publication is not guaranteed. Do not send sensitive information. Pexels photographs are illustrative and used under the Pexels license.'] },
    { heading: 'External services', body: ['Providers, WhatsApp, Google reCAPTCHA, Vercel and source websites operate under their own terms. We are not responsible for their availability or actions.'] },
    { heading: 'Changes', body: ['We may update listings and these terms. The current version is published here. Last updated: 29 October 2026.'] },
  ];
}
