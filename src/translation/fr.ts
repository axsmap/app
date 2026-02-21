const fr = {
  // Common translations
  common: {
    optional: "(facultatif)",
    required: "(obligatoire)",
  },

  // Voice Review translations
  voiceReview: {
    title: "Avis Vocal",
    startRecording: "Commencer l'enregistrement",
    stopRecording: "Arrêter l'enregistrement",
    recording: "Enregistrement en cours...",
    processing: "Traitement de votre avis...",
    recordingHint: "Appuyez pour commencer à enregistrer votre avis d'accessibilité",
    speakHint: "Décrivez les caractéristiques d'accessibilité du lieu",
    maxDuration: "Maximum 2 minutes",
    browserNotSupported: "Votre navigateur ne prend pas en charge l'enregistrement audio",
    microphoneError: "Impossible d'accéder au microphone. Veuillez vérifier les permissions.",
    processingError: "Erreur lors du traitement de l'enregistrement. Veuillez réessayer.",
    networkError: "Erreur réseau. Veuillez vérifier votre connexion et réessayer.",
    tryAgain: "Réessayer",
    cancel: "Annuler",
    submit: "Soumettre l'avis",
    previewTitle: "Aperçu de l'avis",
    editReview: "Modifier l'avis",
    transcription: "Transcription",
    extractedReview: "Avis Extrait",
    confidence: "Confiance",
    confidenceHigh: "Élevée",
    confidenceMedium: "Moyenne",
    confidenceLow: "Faible",
    fieldsExtracted: "{{count}} sur {{total}} champs extraits",
    entrance: "Entrée",
    interior: "Intérieur",
    bathroom: "Toilettes",
    parking: "Stationnement",
    steps: "Marches",
    permanentRamp: "Rampe Permanente",
    portableRamp: "Rampe Portable",
    wideEntrance: "Entrée Large",
    automaticDoor: "Porte Automatique",
    accessiblePath: "Chemin Accessible",
    wideInterior: "Intérieur Spacieux",
    accessibleTable: "Table Accessible",
    accessibleBathroom: "Toilettes Accessibles",
    singleOccupancy: "Occupation Simple",
    loweredSinks: "Lavabos Abaissés",
    grabBars: "Barres d'Appui",
    accessibleParking: "Stationnement Accessible",
    parkingSpots: "Places de Stationnement",
    hasParkingLot: "A un Parking",
    hasStreetParking: "A du Stationnement de Rue",
    hasValidatedParking: "A un Stationnement Validé",
    comments: "Commentaires",
    yes: "Oui",
    no: "Non",
    notMentioned: "Non Mentionné",
    stepsCount: "{{count}} marche(s)",
    reviewSubmitted: "Avis soumis avec succès !",
    submitError: "Erreur lors de la soumission de l'avis. Veuillez réessayer.",
  },

  accountActivatedSuccessTitle: "Compte activé avec succès !",
  accountActivatedSuccessMessage:
    "Votre compte a été activé avec succès. Vous pouvez maintenant vous connecter.",
  goBackToLogin: "Retourner à la page de connexion",
  
  reactivateAccount: {
    title: "Réactiver votre compte",
    description: "Votre compte a été archivé en raison d'inactivité (aucune connexion depuis plus d'un an). Pour réactiver, définissez un nouveau mot de passe et confirmez vos informations.",
    newPasswordLabel: "Nouveau mot de passe",
    newPasswordPlaceholder: "Entrez votre nouveau mot de passe",
    newPasswordHelp: "8-30 caractères",
    confirmPasswordLabel: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "Entrez à nouveau votre nouveau mot de passe",
    firstNameLabel: "Prénom",
    firstNamePlaceholder: "Entrez votre prénom",
    lastNameLabel: "Nom",
    lastNamePlaceholder: "Entrez votre nom",
    emailLabel: "Email",
    emailPlaceholder: "Mettez à jour votre adresse email",
    phoneLabel: "Téléphone",
    phonePlaceholder: "Entrez votre numéro de téléphone",
    zipLabel: "Code postal",
    zipPlaceholder: "Entrez votre code postal",
    submitButton: "Réactiver mon compte",
    submitting: "Réactivation...",
    backToSignIn: "Retour à la connexion",
    returnHome: "Retour à l'accueil",
    successMessage: "Votre compte a été réactivé ! Bienvenue de nouveau.",
    socialLogin: {
      title: "Compte archivé",
      description: "Votre compte a été archivé en raison d'inactivité. Comme vous vous êtes inscrit avec {{provider}}, vous devez contacter notre équipe d'assistance pour réactiver votre compte.",
      whyTitle: "Pourquoi ne puis-je pas réactiver automatiquement ?",
      whyDescription: "Pour des raisons de sécurité, les comptes créés avec une connexion sociale (Google/Facebook) ne peuvent pas être réactivés par une réinitialisation de mot de passe. Notre équipe d'assistance vérifiera votre identité pour assurer la sécurité de votre compte.",
      contactSupport: "Contacter le support",
      backToHome: "Retour à l'accueil",
    },
    errors: {
      newPasswordRequired: "Le nouveau mot de passe est obligatoire",
      passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères",
      passwordTooLong: "Le mot de passe doit contenir moins de 31 caractères",
      confirmPasswordRequired: "Veuillez confirmer votre mot de passe",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      firstNameRequired: "Le prénom est obligatoire",
      firstNameTooLong: "Le prénom doit contenir moins de 25 caractères",
      lastNameRequired: "Le nom est obligatoire",
      lastNameTooLong: "Le nom doit contenir moins de 37 caractères",
      generalError: "Une erreur s'est produite. Veuillez réessayer.",
      serverError: "Erreur serveur. Le service de réactivation n'est peut-être pas encore disponible. Veuillez réessayer plus tard ou contacter le support.",
    },
  },

  getMappingButton: "Obtenir le mapping",
  contactUsTitle: "Contactez-nous",
  contactUsNameLabel: "Nom",
  contactUsNamePlaceholder: "Entrez votre nom",
  contactUsEmailLabel: "Email",
  contactUsEmailPlaceholder: "Entrez votre email",
  contactUsMessageLabel: "Message",
  contactUsMessagePlaceholder: "Entrez un message",
  contactUsSendButton: "Envoyer",
  contactUsSuccessMessage: "Vous avez envoyé un message",
  contactUsErrorMessage: "Une erreur inattendue s'est produite.",

  donateSectionTitle: "Faire un don",
  donorStatsTitle: "Statistiques des donateurs",
  donorAboutTitle: "À propos des donateurs",

  // App Promo Popup
  appPromo: {
    title: "Téléchargez AXS Map",
    body: "Téléchargez l'application pour cartographier plus vite et profiter d'une meilleure expérience.",
    appStore: "App Store",
    googlePlay: "Google Play",
    notNow: "Pas maintenant",
    close: "Fermer",
  },

  editAccountTitle: "Modifier les détails du compte",
  editAccountFirstNameLabel: "Prénom",
  editAccountFirstNamePlaceholder: "Entrez votre prénom",
  editAccountLastNameLabel: "Nom",
  editAccountLastNamePlaceholder: "Entrez votre nom",
  editAccountGenderLabel: "Genre",
  editAccountGenderOptions: {
    male: "Homme",
    female: "Femme",
    other: "Autre",
  },
  editAccountBirthdayLabel: "Date de naissance",
  editAccountDisabilityLabel: "Handicap",
  editAccountRaceLabel: "Race",
  editAccountAboutMeLabel: "À propos de moi",
  editAccountNewsletterLabel: "Je veux recevoir la newsletter AXS",
  editAccountLanguageLabel: "Langue",
  editAccountLanguageOptions: {
    english: "Anglais",
  },
  editAccountPhoneNumberLabel: "Numéro de téléphone",
  editAccountPhoneNumberPlaceholder: "Entrez votre numéro de téléphone",
  editAccountShowDisabilitiesLabel: "Afficher mes handicaps dans le profil",
  editAccountShowEmailLabel: "Afficher mon email dans le profil",
  editAccountShowPhoneLabel: "Afficher mon numéro de téléphone dans le profil",
  editAccountUsernameLabel: "Nom d'utilisateur",
  editAccountZipLabel: "Code postal",
  editAccountZipPlaceholder: "Entrez votre code postal",
  editAccountCancelButton: "Annuler",
  editAccountSaveButton: "Enregistrer",
  editAccountSuccessMessage: "Utilisateur mis à jour avec succès",
  editAccountErrorMessage: "Erreur lors de la mise à jour de l'utilisateur",
  editAccountDeleteButton: "Supprimer le compte",
  editAccountDeleteConfirmTitle: "Supprimer le compte",
  editAccountDeleteConfirmMessage:
    "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
  editAccountDeleteConfirmButton: "Oui, supprimer le compte",
  editAccountDeleteCancelButton: "Annuler",
  editAccountDeleteSuccessMessage: "Compte supprimé avec succès",
  editAccountDeleteErrorMessage: "Erreur lors de la suppression du compte",

  createAccountTitle: "Créer un compte",
  forgotPasswordTitle: "Réinitialisez votre mot de passe",
  forgotPasswordDescription:
    "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
  forgotPasswordEmailLabel: "Email",
  forgotPasswordEmailPlaceholder: "Entrez votre email",
  forgotPasswordVerifyButton: "Vérifier l'email",
  forgotPasswordSuccessMessage:
    "Lien de réinitialisation du mot de passe envoyé à votre email !",
  forgotPasswordErrorMessage: "Une erreur inattendue s'est produite.",
  forgotPasswordBackToLogin: "Retour à la page de connexion",

  loginTitle: "Connectez-vous à votre compte",
  loginEmailLabel: "Email",
  loginEmailPlaceholder: "Entrez votre email",
  loginPasswordLabel: "Mot de passe",
  loginPasswordPlaceholder: "Entrez votre mot de passe",
  loginRememberMe: "Se souvenir de moi",
  loginForgotPassword: "Mot de passe oublié",
  loginButton: "Connexion",
  loginSuccessMessage: "Connexion réussie",
  loginErrorMessage: "Une erreur inattendue s'est produite.",
  loginAccountArchived: "Votre compte a été archivé en raison d'inactivité. Veuillez le réactiver pour continuer.",
  loginOrLoginWith: "Ou connectez-vous avec",
  loginGoogleButton: "Google",
  loginAppleButton: "Apple",
  loginNoAccount: "Vous n'avez pas de compte ?",
  loginCreateAccount: "Créer un compte",

  resetPasswordTitle: "Définir un nouveau mot de passe",
  resetPasswordDescription: "Veuillez entrer votre nouveau mot de passe",
  resetPasswordLabel: "Mot de passe",
  resetPasswordPlaceholder: "Entrez votre nouveau mot de passe",
  resetPasswordButton: "Définir le mot de passe",
  resetPasswordSuccessMessage: "Mot de passe réinitialisé avec succès",
  resetPasswordErrorMessage: "Une erreur inattendue s'est produite.",
  resetPasswordBackToLogin: "Retour à la page de connexion",

  mapathonDetailsParticipantsFrom: "participant sur",
  mapathonDetailsParticipantsGoal: "participants",

  mapathonDetailsRanking: "classé pour les avis donnés",
  mapathonDetailsDateRangeFrom: "Du",
  mapathonDetailsDateRangeTo: "au",
  mapathonDetailsProgress: "{progress}%",
  mapathonsTitle: "Mapathons",
  mapathonsActive: "Actif",
  mapathonsInactive: "Inactif",
  mapathonsFilterAll: "Tous",
  mapathonsFilter10Miles: "10 miles",
  mapathonsFilter20Miles: "20 miles",
  mapathonsFilter50Miles: "50 miles",
  mapathonsCreateButton: "+ Créer un Mapathon",
  mapathonsReviewsMade: "avis donnés sur",
  mapathonReviewsGoal: "avis attendus",
  mapathonsDateRangeFrom: "Du",
  mapathonsDateRangeTo: "au",

  mapathonsLoadMore: "Charger plus",
  mapathonsLoading: "Chargement...",

  accountPageTitle: "Mon compte",
  accountRankedLabel: "Classé",
  accountReviewsLabel: "Avis",
  accountParticipationLabel: "Participation",
  accountDisabilitiesLabel: "Handicaps",
  accountRaceLabel: "Race",
  accountAboutMeLabel: "À propos de moi",
  accountDefaultAboutMe: "Je suis un ingénieur logiciel.",
  accountSignOutButton: "Déconnexion",
  accountEditAccountButton: "Modifier le compte",

  teamsPageTitle: "Équipes",
  teamsCreateButton: "+ Créer une nouvelle équipe",
  teamsRankLabel: "Classement: ",
  teamsReviewsLabel: "Avis :",
  teamsMembersLabel: "Membres :",
  teamsLoadMoreButton: "Charger plus",

  homeNoRatingsMessage: "Ce lieu n'a pas d'avis",
  homeAddReviewButton: "Ajouter un avis",
  homeLoadMoreButton: "Charger plus",

  authModalLoginTitle: "Connexion",
  authModalCreateAccountTitle: "Créer un compte",
  authModalForgotPasswordTitle: "Mot de passe oublié",
  authModalCloseButton: "Fermer",

  cardNoImageAvailable: "Aucune image disponible",
  cardEntranceLabel: "Entrée",
  cardInteriorLabel: "Intérieur",
  cardRestroomLabel: "Toilettes",
  cardNoRatingsMessage: "Ce lieu n'a pas d'avis.",
  cardAddReviewButton: "Ajouter un avis",

  // Venue page translations
  venue: {
    placeImageAlt: "Image du lieu",
    reviews: "avis",
    accessibilityScores: "Scores d'accessibilité",
    entrance: "Entrée",
    interior: "Intérieur",
    restroom: "Toilettes",
    address: "Adresse",
    phone: "Téléphone",
    website: "Site web",
    hours: "Horaires",
    axsReviewsHeading: "Avis AXS Map ({{count}})",
    axsReviewsSubtext: "Avis d'accessibilité de la communauté provenant des utilisateurs d'AXS Map",
    googleReviewsHeading: "Avis Google ({{count}})",
    googleReviewsSubtext: "Avis généraux des utilisateurs de Google",
    googleAttribution: "Avis fournis par Google",
    providedNoComment: "L'utilisateur a fourni des évaluations d'accessibilité sans commentaire écrit.",
    noRatings: "Ce lieu n’a pas encore d’évaluations",
  },

  createAccountSuccessMessage:
    "Compte créé avec succès. Veuillez vérifier votre email pour activer votre compte.",
  createAccountErrorMessage:
    "Une erreur s'est produite lors de la création du compte.",
  stepOneFirstNameLabel: "Prénom",
  stepOneFirstNamePlaceholder: "Entrez votre prénom",
  stepOneLastNameLabel: "Nom",
  stepOneLastNamePlaceholder: "Entrez votre nom",
  stepOneEmailLabel: "Email",
  stepOneEmailPlaceholder: "Entrez votre email",
  stepOnePasswordLabel: "Mot de passe",
  stepOnePasswordPlaceholder: "Entrez votre mot de passe",
  stepOneNextButton: "Suivant",
  stepOneAlreadyUserText: "Déjà utilisateur ?",
  stepOneSignInLink: "Se connecter",
  stepTwoDisabilityLabel: "Handicap",
  stepTwoDisabilityPlaceholder: "Entrez vos handicaps ici",
  stepTwoRaceLabel: "Race",
  stepTwoRacePlaceholder: "Entrez votre race ici",
  stepTwoBackButton: "Retour",
  stepTwoNextButton: "Suivant",
  stepTwoAlreadyUserText: "Déjà utilisateur ?",
  stepTwoSignInLink: "Se connecter",

  selectAnOption: "Sélectionnez une option",
  yes: "Oui",
  no: "Non",
  other: "Autre",
  veryEasy: "Très facile",
  easy: "Facile",
  notEasy: "Pas facile",
  veryHard: "Très difficile",
  impossible: "Impossible",

  // Review section titles
  sectionEntrance: "ENTRÉE",
  sectionInterior: "INTÉRIEUR",
  sectionRestroom: "TOILETTES",
  sectionComment: "COMMENTAIRE",

  // Review steps
  selectMapathon: "Sélectionner un Mapathon",
  selectMapathonError: "Veuillez d'abord sélectionner un Mapathon ou cliquer sur le bouton ignorer",
  applyMapathonLabel: "Associer cet avis à un Mapathon (facultatif)",
  doNotApplyMapathon: "Ne pas associer à un Mapathon",
  skip: "Ignorer",
  next: "Suivant",
  comment: "Commentaire",
  generateComment: "Générer un commentaire",
  generating: "Génération...",
  commentPlaceholder: "Écrivez vos commentaires, conseils, astuces, etc...",
  clearComment: "Effacer le commentaire",
  back: "Retour",
  submit: "Soumettre",
  submitting: "Envoi en cours...",

  // Survey labels
  "survey.featuresLabel": "Quelles fonctionnalités utilisez-vous le plus sur AXS Map?",
  "survey.navigationLabel": "Quelle est la facilité de navigation dans l'application?",
  "survey.satisfactionLabel": "Êtes-vous satisfait de l'application?",
  "survey.recommendLabel": "Le recommanderiez-vous à d'autres?",

  stepThreeDescriptionLabel: "À propos de moi",
  stepThreeDescriptionPlaceholder: "Entrez des détails sur vous",
  stepThreeNewsletterLabel: "Je veux recevoir la newsletter AXS",
  stepThreeBackButton: "Retour",
  stepThreeCreateAccountButton: "Créer un compte",
  stepThreeOrCreateWithText: "Ou créer un compte avec",
  stepThreeGoogleButton: "Google",
  stepThreeAppleButton: "Apple",
  stepThreeAlreadyUserText: "Déjà utilisateur ?",
  stepThreeSignInLink: "Se connecter",

  createMapathonTitle: "Créer un Mapathon",
  createMapathonNameLabel: "Nom",
  createMapathonNamePlaceholder: "Nom de votre Mapathon",
  createMapathonDescriptionLabel: "Description du Mapathon",
  createMapathonDescriptionPlaceholder: "Courte description ici...",
  createMapathonLocationLabel: "Emplacement",
  createMapathonLocationPlaceholder: "Entrez l'emplacement",
  createMapathonMapLabel: "Aperçu de l'emplacement du Mapathon",
  createMapathonMapHelperText: "Aperçu de l'emplacement basé sur l'adresse saisie ci-dessus",
  createMapathonDurationLabel: "Durée",
  createMapathonParticipantsLabel: "Combien de participants rejoindront ?",
  createMapathonParticipantsPlaceholder: "Nombre de participants",
  createMapathonReviewsLabel: "Quel est votre objectif d'avis ?",
  createMapathonReviewsPlaceholder: "Nombre d'avis",
  createMapathonIsOpenLabel: "Rendre ce Mapathon public",
  createMapathonHostAsLabel: "Héberger en tant que",
  createMapathonDonationEnabledLabel:
    "Oui ! Je veux faire de cet événement une collecte de fonds pour AXS Lab",
  createMapathonDonationGoalLabel: "Objectif de dons",
  createMapathonDonationAmountLabel: "Montant des dons",
  createMapathonSubmitButton: "Créer un Mapathon",
  createMapathonSuccessMessage: "Mapathon créé avec succès",
  createMapathonErrorMessage: "Une erreur inattendue s'est produite",

  createTeamTitle: "Créer votre équipe",
  editTeamTitle: "Modifier votre équipe",
  createTeamNameLabel: "Nom",
  createTeamNamePlaceholder: "Nom de votre équipe",
  createTeamDescriptionLabel: "Description",
  createTeamDescriptionPlaceholder: "Courte description ici...",
  createTeamAvatarLabel: "Ajouter un avatar",
  createTeamAvatarFileTypeDescription:
    "Les fichiers doivent être inférieurs à 5 Mo.",
  createTeamSubmitButton: "Créer une équipe",
  editTeamSubmitButton: "Mettre à jour l'équipe",
  createTeamCancelButton: "Annuler",
  createTeamSuccessMessage: "Équipe créée avec succès",
  editTeamSuccessMessage: "Équipe mise à jour avec succès",
  createTeamPhotoUploadSuccess: "Photo téléchargée avec succès",
  createTeamPhotoUploadError: "Échec du téléchargement de la photo",

  faqTitle: "FAQ",
  faqVideoTitle: "AXS Map : Rejoignez le mouvement aujourd'hui",
  faqHowToRateVenueTitle: "Comment évaluer un lieu ?",
  faqHowToRateVenueDescription:
    "AXS Map vous guide à travers un processus d'évaluation intuitif, mais considérez les critères suivants lors de l'évaluation d'un lieu :",
  faqHowToRateVenueEntrance:
    "Entrée – l'entrée a-t-elle des marches, une rampe, un parking réservé, une deuxième entrée ou une entrée large ?",
  faqHowToRateVenueInterior:
    "Intérieur – l'intérieur a-t-il de l'espace pour se déplacer, une rampe, un ascenseur accessible ou une hauteur de table accessible ?",
  faqHowToRateVenueRestroom:
    "Toilettes – la porte des toilettes s'ouvre-t-elle vers l'extérieur, y a-t-il de grandes cabines, des supports autour des toilettes ou des lavabos abaissés ?",
  faqHowToRateVenueOther:
    "Autre – le lieu est-il bien éclairé, a-t-il un niveau sonore élevé ou accepte-t-il les chiens d'assistance ?",
  faqAddPlaceTitle: "Puis-je ajouter un lieu qui n'est pas sur AXS Map ?",
  faqAddPlaceDescription:
    "Non - AXS Map utilise la base de données Google Places pour remplir ses cartes. Google Places travaille à cataloguer les entreprises du monde entier. Si un lieu manque, nous vous recommandons de soumettre une demande à Google.",
  faqNeighborhoodTitle:
    "Dans mon quartier ou ma ville, il y a beaucoup de lieux qui n'ont pas été évalués. Que dois-je faire ?",
  faqNeighborhoodDescription:
    "Nous avons besoin que les communautés se rassemblent pour cartographier leurs quartiers. Chez AXS Map, nous avons créé un outil spécial pour vous aider, vous et votre communauté, à le faire. Cela s'appelle l'outil 'Mapathons', et vous devriez le consulter !",
  faqReviewPlacesTitle: "Puis-je évaluer des lieux où je ne vis pas ?",
  faqReviewPlacesDescription:
    "Absolument. Si vous êtes allé dans un lieu et que vous en avez un bon souvenir (peut-être un lieu que vous fréquentez), n'hésitez pas à donner un avis !",
  faqRegistrationTitle: "Dois-je m'inscrire pour utiliser AXS Map ?",
  faqRegistrationDescription:
    "Non, vous n'avez pas besoin de vous inscrire pour utiliser AXS Map. Sans inscription, vous pourrez toujours voir tous les avis sur AXS Map et vous aurez un accès complet à tout sur nos cartes. Mais si vous souhaitez donner des avis, nous aurons besoin que vous vous inscriviez d'abord. L'inscription est gratuite et facile, et toutes les informations que vous fournissez à AXS Map resteront anonymes.",
  faqFindPlaceTitle:
    "Comment trouver un lieu que je veux évaluer dans la base de données AXS Map ?",
  faqFindPlaceIntro:
    "Il existe plusieurs façons de trouver un lieu sur AXS Map.",
  faqFindPlaceSearchBoxes:
    "Sur la page principale d'AXS Map, vous verrez deux zones de recherche. Si vous cherchez 'Joe's Coffee' à Biloxi, Louisiane, vous tapez 'Joe's Coffee' dans la barre de recherche de gauche et 'Biloxi, Louisiane' dans la barre de recherche de droite.",
  faqFindPlaceSearchEverything:
    "Une autre approche consiste à rechercher 'Tout' dans la barre de recherche de gauche, puis à entrer une adresse à proximité de votre emplacement dans la barre de recherche de droite.",
  faqFindPlaceGoogleDatabase:
    "Si vous avez essayé ces approches de recherche et que vous ne trouvez pas le lieu que vous souhaitez évaluer, il se peut que la base de données Google Places n'ait pas indexé cette entreprise.",
  faqMapathonProcessTitle: "Quel est le processus pour un Mapathon™ ?",
  faqMapathonAnimationPrompt:
    "Avez-vous regardé notre animation Mapathon ? Sinon, consultez-la ici.",
  faqMapathonVideoTitle: "AXS Map : Rejoignez le mouvement aujourd'hui",
  faqMapathonToolkitTitle: "Boîte à outils Mapathon",
  faqToolkitPaperFormsTitle: "Formulaires papier pour les avis :",
  faqToolkitPaperFormsDescription:
    "Ces formulaires permettent à vos participants de saisir des avis sur papier. C'est une bonne chose à avoir au cas où le téléphone de quelqu'un ne fonctionnerait pas ou si un participant n'a pas de téléphone.",
  faqToolkitBrochureTitle: "Brochure à distribuer aux entreprises :",
  faqToolkitBrochureDescription:
    "Lorsque vos participants Mapathon parcourent les quartiers, cela peut parfois être un peu surprenant pour un propriétaire d'entreprise lorsqu'ils demandent à 'voir' leurs toilettes.",
  faqToolkitHowToRateTitle: "Comment évaluer :",
  faqToolkitHowToRateDescription:
    "Conseils pour donner des avis - Certains de vos participants peuvent aimer voir des conseils pour donner des avis.",
  faqMapathonStepsIntro: "Voici les étapes d'un Mapathon typique :",
  faqMapathonSteps: [
    {
      title: "Planifiez le Mapathon :",
      description:
        "Nous recommandons de prévoir une période de 4 heures pour un samedi ou un dimanche.",
    },
    {
      title: "Invitez des personnes à participer :",
      description: "Invitez autant de personnes que possible à votre Mapathon.",
    },
    {
      title: "Lancez le Mapathon :",
      description:
        "Il est généralement préférable que tout le monde se réunisse en un seul endroit pour le lancement.",
    },
    {
      title: "Divisez en équipes :",
      description:
        "Divisez les participants en équipes et attribuez-leur des zones spécifiques à examiner.",
    },
    {
      title: "Fournissez des outils et des instructions :",
      description:
        "Assurez-vous que les participants disposent de l'application AXS Map et comprennent comment l'utiliser.",
    },
    {
      title: "Commencez à examiner :",
      description:
        "Les équipes doivent visiter leurs zones assignées et commencer à examiner les lieux.",
    },
    {
      title: "Regroupez-vous et partagez vos expériences :",
      description:
        "Après le Mapathon, regroupez-vous pour partager vos expériences et vos commentaires.",
    },
    {
      title: "Soumettez les avis :",
      description:
        "Assurez-vous que tous les avis sont soumis sur la plateforme AXS Map.",
    },
    {
      title: "Célébrez et remerciez les participants :",
      description:
        "Célébrez le succès du Mapathon et remerciez tout le monde pour leur participation.",
    },
  ],

  termsTitle: "Conditions générales",
  termsLastUpdated: "Dernière mise à jour : 19 mai 2021.",
  termsIntro:
    "En utilisant les sites web et les applications mobiles d'AXS Map, vous acceptez les conditions générales suivantes. Veuillez les lire attentivement.",
  termsDescription1:
    "Ces conditions générales (les 'Conditions') régissent votre accès et votre utilisation du site web d'AXS Lab situé à www.axsmap.com (le 'Site'). En accédant ou en utilisant le Site, vous acceptez ces Conditions et concluez un contrat juridiquement contraignant avec AXS Lab Inc. ('AXS'). AXS Lab Inc. est une organisation à but non lucratif enregistrée 501(c)3. N'accédez pas ou n'utilisez pas le Site si vous ne souhaitez pas ou ne pouvez pas être lié par les Conditions suivantes.",
  termsDescription2:
    "CES CONDITIONS ÉTABLISSENT LES CONDITIONS GÉNÉRALES JURIDIQUEMENT CONTRAIGNANTES QUI RÉGISSENT VOTRE UTILISATION DU SITE. EN ACCÉDANT OU EN UTILISANT LE SITE, VOUS ACCEPTEZ CES CONDITIONS, ET VOUS DÉCLAREZ ET GARANTISSEZ QUE VOUS AVEZ LE DROIT, L'AUTORITÉ ET LA CAPACITÉ D'ENTRER DANS CES CONDITIONS. SI VOUS N'ACCEPTEZ PAS TOUTES LES DISPOSITIONS DE CES CONDITIONS, N'ACCÉDEZ PAS ET/OU N'UTILISEZ PAS LE SITE.",
  termsDefinitionsTitle: "1. Définitions",
  termsDefinitionsPartiesTitle: "A. Parties",
  termsDefinitionsPartiesDescription:
    "'Vous' et 'votre' désignent l'utilisateur du Site. Un 'utilisateur' est une personne qui accède, navigue ou utilise le Site de quelque manière que ce soit. 'Nous', 'notre' et 'nos' désignent AXS.",
  termsDefinitionsContentTitle: "B. Contenu",
  termsDefinitionsContentDescription:
    "'Contenu' désigne les textes, images, photos, audio, vidéos, données de localisation et toutes autres formes de données ou de communication. 'Votre Contenu' désigne le Contenu que vous soumettez ou transmettez via ou en relation avec le Site...",
  termsChangesTitle: "2. Modifications des Conditions d'utilisation",
  termsChangesDescription:
    "Nous pouvons modifier les Conditions de temps à autre. Lorsque des modifications sont apportées, nous vous en informerons en rendant la version révisée disponible sur cette page...",
  termsUsingSiteTitle: "3. Utilisation du Site",
  termsEligibilityTitle: "A. Éligibilité",
  termsEligibilityDescription1:
    "Pour accéder ou utiliser le Site, vous devez avoir 13 ans ou plus et disposer des pouvoirs et de l'autorité nécessaires pour accepter ces Conditions...",
  termsEligibilityDescription2:
    "Vous ne pouvez pas utiliser le Site et ne pouvez pas accepter les Conditions si (a) vous n'avez pas l'âge légal pour conclure un contrat contraignant avec AXS...",
  termsUsersUnder18Title: "Utilisateurs de moins de 18 ans",
  termsUsersUnder18Description1:
    "Le Site n'est pas destiné aux utilisateurs de moins de 13 ans. Si vous avez moins de 13 ans, vous ne serez pas autorisé à créer un compte...",
  termsUsersUnder18Description2:
    "Si vous avez moins de 18 ans, en utilisant le Site, vous déclarez (c'est-à-dire que vous promettez) agir avec le consentement de votre parent/tuteur...",
  termsUsersUnder18Description3:
    "Si un parent/tuteur nous informe que son enfant a menti sur son âge lors de la création d'un compte, nous supprimerons le compte...",
  termsPermissionTitle: "B. Permission d'utiliser le Site",
  termsPermissionDescription:
    "Sous réserve de ces Conditions, nous vous accordons un droit personnel, non exclusif, non transférable, limité et révocable d'accéder et d'utiliser...",
  termsSiteAvailabilityTitle: "C. Disponibilité du Site",
  termsSiteAvailabilityDescription:
    "Le Site peut être modifié, mis à jour, interrompu, suspendu ou arrêté à tout moment sans préavis ni responsabilité.",
  termsUserAccountsTitle: "D. Comptes utilisateur",
  termsUserAccountsDescription1:
    "Vous pouvez créer un compte et fournir certaines informations personnelles vous concernant afin d'utiliser certaines fonctionnalités...",
  termsUserAccountsDescription2:
    "Votre compte est destiné à votre usage personnel et non commercial uniquement. Lors de sa création, nous vous demandons de fournir des informations complètes et exactes...",
  termsCommunicationsTitle: "E. Communications d'AXS et d'autres utilisateurs",
  termsCommunicationsDescription:
    "En créant un compte, vous acceptez de recevoir certaines communications en relation avec le Site...",
  termsContentTitle: "4. Contenu",
  termsResponsibilityTitle: "A. Responsabilité pour Votre Contenu",
  termsResponsibilityDescription1:
    "Vous êtes seul responsable de Votre Contenu, et une fois publié, il ne peut pas toujours être retiré...",
  termsResponsibilityDescription2:
    "Vous pouvez vous exposer à des responsabilités si, par exemple, Votre Contenu contient des éléments faux, intentionnellement trompeurs...",
  termsOurRightTitle: "B. Notre droit d'utiliser Votre Contenu",
  termsOurRightDescription:
    "Nous pouvons utiliser Votre Contenu de différentes manières, notamment en l'affichant publiquement, en le reformattant...",
  termsOwnershipTitle: "C. Propriété",
  termsOwnershipDescription:
    "Entre vous et AXS, vous possédez Votre Contenu. Nous possédons le Contenu AXS, y compris, mais sans s'y limiter, les interfaces visuelles...",
  termsAdvertisingTitle: "D. Publicité",
  termsAdvertisingDescription:
    "AXS et ses licenciés peuvent afficher publiquement des publicités et d'autres informations adjacentes ou incluses avec Votre Contenu...",
  termsMapathonsTitle: "E. Mapathons",
  termsMapathonsDescription1:
    "Dans le cas où vous participez, créez, organisez ou assistez à un événement Mapathon...",
  termsMapathonsDescription2:
    "Vous assumez tous les risques lors de votre participation à un Mapathon. Tous les participants doivent faire preuve de prudence et de bon jugement...",
  termsMapathonsDescription3:
    "Vous défendrez, indemniserez et dégagerez de toute responsabilité AXS et les organisateurs de Mapathon, les directeurs d'AXS, les employés...",
  termsPersonalInfoTitle: "F. Informations personnelles",
  termsPersonalInfoDescription:
    "Nous traitons les informations personnelles collectées sur et via le Site conformément à l'Avis de confidentialité disponible sur le Site.",
  termsOtherTitle: "G. Autre",
  termsOtherDescription:
    "Le Contenu utilisateur ne reflète pas nécessairement l'opinion d'AXS. AXS ne révise pas nécessairement le Contenu utilisateur...",
  termsRestrictionsTitle: "5. Restrictions",
  termsRestrictionsDescription:
    "Nous ne sommes pas obligés de faire respecter les Conditions en votre nom contre un autre utilisateur...",
  termsQuestionsTitle: "15. Questions",
  termsQuestionsDescription:
    "Si vous avez des questions concernant ces Conditions, veuillez nous envoyer un email à : axsmap@axslab.org",

  footerCopyright: "AXS MAP",
  footerFAQ: "FAQ",
  footerShop: "Boutique",
  footerPrivacyPolicy: "Politique de confidentialité",
  footerTermsConditions: "Conditions générales",
  footerContact: "Contact",
  footerFacebookLink: "https://www.facebook.com/axsmap",
  footerTwitterLink: "https://twitter.com/axsmap",
  footerYouTubeLink: "https://www.youtube.com/axsmaptv",
  footerFacebookAlt: "facebook",
  footerTwitterAlt: "twitter",
  footerYouTubeAlt: "youtube",

  infoModalLogoAlt: "Logo AXS Map",
  infoModalBannerAlt: "Bannière principale AXS",
  infoModalWelcomeTitle: "Bienvenue sur AXS Map,",
  infoModalWelcomeDescription:
    "Un outil conçu pour nous aider à cartographier l'inclusion dans les communautés et à trouver plus de lieux pour plus de personnes.",
  infoModalRatingSystemTitle: "LE SYSTÈME DE NOTATION",
  infoModalRatingSystemDescription:
    "Notre système d'icônes vous permet de déterminer en un coup d'œil comment les utilisateurs ont évalué un lieu pour son accessibilité, à travers trois phases différentes.",
  infoModalVenuePhasesTitle: "PHASES DU LIEU",
  infoModalEntranceAlt: "Icône d'entrée",
  noRecordFound: "Aucun enregistrement trouvé!",
  infoModalEntranceLabel: "ENTRÉE",
  infoModalInteriorAlt: "Icône d'intérieur",
  infoModalInteriorLabel: "INTÉRIEUR",
  infoModalRestroomAlt: "Icône de toilettes",
  infoModalRestroomLabel: "TOILETTES",
  infoModalColorSystemTitle: "SYSTÈME DE COULEURS",
  infoModalAccessibleLabel: "ACCESSIBLE",
  infoModalCautionLabel: "PRUDENCE",
  infoModalAlertLabel: "ALERTE",
  infoModalFullyAccessibleTitle: "ÉVALUÉ COMME ENTIÈREMENT ACCESSIBLE",

  teamBannerAlt: "Bannière de l'équipe",
  teamRankLabel: "Classement",
  teamReviewsLabel: "Avis",
  teamMapathonLabel: "Mapathon",
  teamMapathonName: "La Vida Scholars Lynn AXS Mapathon",
  teamShareLabel: "Partager :",
  teamJoinButton: "+ Rejoindre l'équipe",
  teamEditButton: "Modifier l'équipe",
  teamJoinRequestSuccess: "La demande a été envoyée pour rejoindre l'équipe",

  headerLogoAlt: "Logo AXS Map",
  headerPlaces: "Lieux",
  headerMapathons: "Mapathons",
  headerTeams: "Équipes",
  headerDonate: "Faire un don",
  headerSignIn: "Se connecter",
  accountUserNameLabel: "Nom d'utilisateur",
  accountGenderLabel: "Genre",
  searchPlaceholderLabel:
    "Rechercher par catégorie et adresse (café, New York)",

  headerMyAccount: "Mon compte",
  headerUserAvatarAlt: "Avatar de l'utilisateur",
  ThankYouReviewClose: "Fermer",
  ThankYouReviewDetailsHeader: "Merci",
  ThankYouReviewDefaultPageTitle: "Merci pour votre avis | AXS Map",
  ThankYouReviewDetailsPageTitle: "Plus de lieux, pour plus de personnes.",
  ThankYouReviewNotFoundPageTitle: "Avis de remerciement introuvable | AXS Map",
  ThankYouReviewDetailsPageDescription:
    "Merci de contribuer à la communauté AXS Map. Avec votre aide et vos connaissances, nous sommes un avis plus près d'un monde avec plus d'expériences que nous aimons - des expériences pour tout le monde.",
  ThankYouReviewRatingsHeader: "Vous avez évalué :",
  ThankYouReviewTextPlaceholder: "Évaluez ce lieu pour ajouter des photos",
  ThankYouReviewItemsPlaceholder: "articles",
  ThankYouReviewLocationsPlaceholder: "lieux",

  mapathonDetailsOrganizer: "Organisateur",
  mapathonDetailsParticipant: "Participant",

  mapathonDetailsOrganizerNotFound: "Aucun organisateur trouvé",
  mapathonDetailsParticipantNotFound: "Aucun participant trouvé",
  loginFacebookButton: "Se connecter avec Facebook",
  copyright: "&copy; 2025 AXS MAP",
  faq: "FAQ",
  shop: "Boutique",
  privacyPolicy: "Politique de confidentialité",
  termsConditions: "Conditions générales",
  contact: "Contact",
  facebookAlt: "facebook",
  twitterAlt: "twitter",
  youtubeAlt: "youtube",

  title: "Politique de confidentialité",
  lastUpdated: "Dernière mise à jour : 23 avril 2022.",
  generalTitle: "I. Général",
  generalDescription:
    "AXS Lab Inc. et ses affiliés (collectivement, « nous », « notre », « nos » ou « AXS ») possèdent et exploitent www.axsmap.com (le « Site ») et nous nous engageons à protéger votre vie privée et vos informations personnelles...",
  personalInfoTitle: "II. Quelles informations personnelles collectons-nous ?",
  registerTitle: "a) Lorsque vous vous inscrivez sur le site",
  registerDescription:
    "Lorsque vous vous inscrivez sur le site, nous collectons les identifiants suivants qui peuvent, seuls ou en combinaison avec d'autres informations, constituer des informations personnelles :",
  registerList: [
    "Nom",
    "E-mail",
    "Mot de passe",
    "Adresse",
    "Votre choix d'abonnement à la newsletter",
  ],
  communicateTitle: "b) Lorsque vous communiquez avec nous",
  communicateDescription:
    "Lorsque vous communiquez avec nous sur et via le site, envoyez un e-mail ou communiquez autrement avec nous, nous collectons les identifiants suivants qui peuvent, seuls ou en combinaison avec d'autres informations, constituer des informations personnelles :",
  communicateList: [
    "Nom",
    "Informations de contact telles qu'une adresse e-mail et une adresse postale",
    "Contenu des communications envoyées",
  ],
  requestInfoTitle: "c) Lorsque vous demandez des informations",
  requestInfoDescription:
    "Lorsque vous utilisez la fonction « Contact » sur le site, nous collectons les identifiants suivants qui peuvent, seuls ou en combinaison avec d'autres informations, constituer des informations personnelles :",
  requestInfoList: [
    "Nom",
    "Informations de contact telles qu'une adresse e-mail",
    "Contenu des communications envoyées",
  ],
  dataRequestTitle: "d) Demande et suppression de données",
  dataRequestDescription:
    "Vous avez le droit en vertu de cette politique de confidentialité de :",
  dataRequestList: [
    "Demander l'accès à vos données personnelles.",
    "Demander la correction des données personnelles que nous détenons à votre sujet.",
    "Demander l'effacement de vos données personnelles.",
    "Demander le transfert de vos données personnelles.",
    "Retirer votre consentement.",
  ],
  surveysTitle: "e) Enquêtes, tirages au sort et promotions",
  surveysDescription:
    "Vous pouvez participer à des enquêtes, tirages au sort et autres promotions sur le site (collectivement « Promotions »). Si vous choisissez de participer aux promotions, nous pouvons collecter les identifiants suivants qui peuvent, seuls ou en combinaison avec d'autres informations, constituer des informations personnelles :",
  surveysList: [
    "Nom",
    "Informations de contact telles qu'une adresse e-mail, une adresse postale et un numéro de téléphone",
  ],
  internetActivityTitle: "f) Informations sur l'activité Internet",
  internetActivityDescription:
    "Le logiciel utilisé sur le site collecte des informations sur l'activité Internet ou d'autres réseaux électroniques qui peuvent, seules ou en combinaison avec d'autres informations, constituer des informations personnelles :",
  internetActivityList: [
    "Le domaine à partir duquel vous accédez au site",
    "Le type de navigateur et le système d'exploitation utilisés dans l'appareil que vous utilisez pour accéder au site",
    "Adresse IP",
    "La date et l'heure de votre visite sur le site (horodatage)",
    "Les pages consultées sur le site",
    "Le site Web utilisé pour créer un lien vers le site",
    "Tous les termes de recherche utilisés pour naviguer sur le site",
    "Produits achetés et consultés sur le site",
    "Un ID de session de navigation",
    "Si vous êtes un visiteur pour la première fois sur le site",
  ],
  sourcesTitle: "III. Les sources d'informations personnelles",
  sourcesDescription:
    "Nous collectons des informations personnelles à partir des catégories de sources suivantes :",
  sourcesList: [
    "Vous : lorsque vous fournissez volontairement des informations personnelles",
    "Fournisseurs tiers de gestion d'identité tels que Facebook ou Google",
    "Logiciel : informations collectées automatiquement via des cookies, journaux Web, balises Web et autres outils d'analyse basés sur des logiciels",
  ],
  purposesTitle:
    "IV. Pourquoi collectons-nous des informations personnelles vous concernant",
  purposesDescription:
    "Nous utilisons des informations personnelles vous concernant aux fins suivantes :",
  purposesList: [
    "Exploiter et améliorer notre site, y compris grâce à des analyses pour nous aider à comprendre comment vous utilisez le site",
    "Fournir les services, tels que la possibilité d'organiser des Mapathons, disponibles sur le site",
    "Vous fournir toutes les informations que vous demandez",
    "Vous informer des modifications apportées au site",
    "Nous permettre d'émettre un avis, une action administrative ou corrective à votre égard en relation avec le site, si nécessaire",
    "Vous envoyer des messages marketing directs auxquels vous avez consenti",
    "Protéger contre, identifier et prévenir la fraude et d'autres activités illégales",
    "Respecter les exigences légales applicables, les normes de l'industrie et nos propres politiques",
    "Fournir des informations sur d'autres produits et services que nous proposons et qui pourraient vous intéresser",
  ],

  discloseTitle: "V. Comment nous divulguons les informations personnelles",
  discloseDescription:
    "Nous pouvons divulguer les catégories suivantes d'informations personnelles aux catégories suivantes de tiers à des fins commerciales :",
  discloseTableHeaders: {
    categoryOfInfo: "Catégorie d'informations personnelles",
    categoryOfThirdParty: "Catégorie de tiers",
  },
  discloseTableRows: [
    {
      personalInfo: [
        "Identifiants",
        "Informations sur l'activité Internet",
        "Informations professionnelles",
      ],
      thirdParty: ["Nos affiliés (tels que les filiales que nous possédons)"],
    },
    {
      personalInfo: [
        "Identifiants",
        "Informations professionnelles",
        "Informations sur l'activité Internet",
      ],
      thirdParty: [
        "Fournisseurs de services : nous utilisons des fournisseurs de services tels que des entreprises d'hébergement et de gestion de sites Web, et des entreprises de stockage et d'analyse de données. Ces fournisseurs de services ne peuvent utiliser les informations personnelles que pour fournir ces services et à aucune autre fin.",
      ],
    },
    {
      personalInfo: [
        "Identifiants",
        "Informations professionnelles",
        "Informations sur l'activité Internet",
      ],
      thirdParty: [
        "Parties à une transaction ou procédure d'entreprise : en cas de vente, fusion, réorganisation, faillite, dissolution ou événement similaire, les informations personnelles peuvent faire partie des actifs transférés.",
      ],
    },
    {
      personalInfo: ["Identifiants", "Informations professionnelles"],
      thirdParty: [
        "Autorités publiques et procédures légales : AXS peut divulguer des informations personnelles vous concernant à des responsables gouvernementaux ou des autorités judiciaires ou à des tiers privés comme l'exige la loi, et divulguer et utiliser ces informations comme nous le jugeons nécessaire ou approprié pour (a) se conformer aux lois applicables et aux demandes légales et processus légaux, tels que répondre à des assignations ou des demandes des autorités gouvernementales ; (b) appliquer les termes et conditions qui régissent le site ; (d) protéger nos droits, notre vie privée, notre sécurité ou notre propriété, et/ou ceux de vous ou d'autres personnes ; et (e) protéger, enquêter et dissuader contre des activités frauduleuses, nuisibles, non autorisées, contraires à l'éthique ou illégales.",
      ],
    },
  ],

  californiaRightsTitle: "VI. Droits à la vie privée en Californie",
  californiaRightsIntro:
    "La section 1798.83 du Code civil de Californie permet aux utilisateurs du site qui sont résidents de Californie de demander certaines informations concernant notre divulgation d'informations personnelles à des tiers à des fins de marketing direct. Pour faire une telle demande, veuillez nous contacter à",
  californiaRightsEmail: "axsmaps@axslab.org",

  dataRetentionTitle: "VII. Conservation des données",
  dataRetentionDescription:
    "Nous ne conserverons les informations personnelles vous concernant que le temps nécessaire pour atteindre les objectifs pour lesquels elles ont été collectées, y compris pour satisfaire à toute exigence légale, comptable ou de reporting. Pour déterminer la période de conservation appropriée des informations personnelles, nous prenons en compte la quantité, la nature et la sensibilité des informations personnelles, le risque potentiel de préjudice résultant de l'utilisation ou de la divulgation non autorisée des informations personnelles, les objectifs pour lesquels nous traitons les informations personnelles et si nous pouvons atteindre ces objectifs par d'autres moyens, ainsi que les exigences légales applicables.",

  linksTitle: "VIII. Liens vers d'autres sites Web",
  linksDescription:
    "Le site peut contenir des liens vers d'autres sites Web d'intérêt. Cependant, une fois que vous avez utilisé ces liens pour quitter le site, nous n'avons aucun contrôle sur les sites Web tiers. Nous ne pouvons être responsables de la protection et de la confidentialité des informations personnelles que vous fournissez lors de la visite de ces sites et ces sites ne sont pas régis par cet avis de confidentialité. Vous devez faire preuve de prudence et examiner l'avis de confidentialité applicable au site en question.",

  childrenTitle: "IX. Enfants",
  childrenDescription:
    "Le site et les services ne sont pas destinés aux enfants de moins de 16 ans. En conséquence, nous n'avons pas l'intention de collecter des informations personnelles auprès de toute personne que nous savons être âgée de moins de 16 ans. Nous ne collectons, ne vendons ni ne traitons intentionnellement les informations personnelles des individus de moins de 16 ans.",

  cookiesTitle: "X. Comment utilisons-nous les cookies ?",
  cookiesDescription:
    "Certaines fonctionnalités du site nécessitent l'utilisation de 'cookies' - de petits fichiers texte qui sont stockés sur le disque dur de votre appareil. Nous utilisons des cookies pour mesurer les pages consultées et les fonctionnalités les plus fréquemment utilisées. Cela nous permet d'améliorer continuellement le site pour répondre aux besoins de nos visiteurs.",
  cookiesTableHeaders: {
    type: "Type de cookies",
    description: "Description",
    managingSettings: "Gestion des paramètres",
  },
  cookiesTableRows: [
    {
      type: "Cookies requis",
      description:
        "Les cookies requis vous permettent de naviguer sur le site et d'utiliser ses fonctionnalités, telles que l'accès à des zones sécurisées du site et l'utilisation de nos services. Si vous avez choisi de vous identifier auprès de nous, nous utilisons des cookies contenant des informations cryptées pour nous permettre de vous identifier de manière unique. Ces cookies nous permettent de vous identifier de manière unique lorsque vous êtes connecté au site et de traiter vos transactions et demandes en ligne.",
      managingSettings:
        "Étant donné que les cookies requis sont essentiels pour le fonctionnement du site, il n'y a pas d'option pour désactiver ces cookies.",
    },
    {
      type: "Cookies de performance",
      description:
        "Ces cookies collectent des informations sur la façon dont vous utilisez le site, y compris les pages que vous consultez le plus souvent et si elles reçoivent des messages d'erreur de certaines pages. Ces cookies ne collectent pas d'informations qui vous identifient individuellement. Les informations sont uniquement utilisées pour améliorer le fonctionnement et les performances du site.",
      managingSettings:
        "Pour savoir comment désactiver les cookies de performance à l'aide des paramètres de votre navigateur, cliquez ici. Pour savoir comment gérer les paramètres de confidentialité et de stockage des cookies Flash, cliquez ici.",
    },
    {
      type: "Cookies de fonctionnalité",
      description:
        "Les cookies de fonctionnalité permettent au site de se souvenir des informations que vous avez saisies ou des choix que vous avez faits (tels que votre nom d'utilisateur, votre langue ou votre région) et de fournir des fonctionnalités améliorées et plus personnelles.",
      managingSettings:
        "Pour savoir comment désactiver les cookies de fonctionnalité à l'aide des paramètres de votre navigateur, cliquez ici. Pour savoir comment gérer les paramètres de confidentialité et de stockage des cookies Flash, cliquez ici.",
    },
  ],

  securityTitle: "XI. Sécurité",
  securityDescription:
    "Nous prenons des mesures raisonnables et appropriées pour protéger les informations personnelles contre la perte, l'utilisation abusive et l'accès, la divulgation, la modification et la destruction non autorisés, en tenant compte des risques liés au traitement et de la nature des informations personnelles. Malgré ces efforts, nous ne pouvons garantir la sécurité des informations personnelles pendant leur transmission ou leur stockage sur nos systèmes.",

  changesTitle: "XII. Modifications de cet avis",
  changesDescription:
    "Cet avis de confidentialité peut être modifié de temps à autre, à compter de la date mentionnée dans la version mise à jour de l'avis de confidentialité. Vous pouvez savoir quand cet avis de confidentialité a été mis à jour pour la dernière fois en consultant la légende Dernière mise à jour en haut de cette page. Veuillez consulter périodiquement le site pour examiner ces modifications de l'avis de confidentialité.",

  dntTitle: "XIII. Paramètres Do Not Track ('DNT')",
  dntDescription:
    "La loi californienne nous oblige à vous informer de la manière dont nous répondons aux signaux Do Not Track (DNT) des navigateurs Web. Étant donné qu'il n'existe actuellement aucune norme industrielle ou légale pour reconnaître ou honorer les signaux DNT, nous n'y répondons pas pour le moment.",

  PrivacyPolicyContactUsTitle: "XIV. Contactez-nous",
  contactUsDescription:
    "Si vous avez des questions ou des préoccupations concernant cet avis de confidentialité ou nos pratiques en matière de confidentialité ou de sécurité des données, veuillez nous contacter via les moyens suivants :",
  contactUsEmail: "axsmap@axslab.org",

  donationTitle: "Ouvrez plus de portes pour plus de personnes",
  description:
    "En faisant un don, vous permettez à AXS Lab de faire ce que nous faisons de mieux — rassembler les gens et créer un monde pour tout le monde. Les dons signifient accroître la liberté d'accessibilité pour tous et aider des personnes réelles — des millions d'entre elles — de manière très concrète.",
  donateOnce: "Faire un don unique",
  donateMonthly: "Faire un don mensuel",
  chooseAmount: "Choisissez un montant à donner",
  amounts: {
    25: "25 $",
    50: "50 $",
    100: "100 $",
    other: "Autre montant",
  },
  donateButton: "Faire un don",
  DonorAboutTitle: "Faites connaissance avec Jason Dasilva",
  DonorAboutDescription:
    "Lorsqu'il a été diagnostiqué avec une sclérose en plaques progressive primaire à 25 ans, le cinéaste Jason Dasilva s'est tourné vers l'art et la narration, remportant un Emmy pour le film qui racontait son parcours des cannes au déambulateur, puis au fauteuil roulant, When I Walk. Aujourd'hui, Jason est un réalisateur, producteur, écrivain, militant des droits des personnes handicapées et fondateur d'AXS Lab. Son objectif ? Sensibiliser à travers des histoires, des outils et de l'art, afin de faire grandir le monde pour inclure plus d'expériences et plus de liberté pour tout le monde.",
  viewFilmsButton: "Voir tous les films de Jason",
  socialLinks: {
    facebook: "https://www.facebook.com/axsmap",
    twitter: "https://twitter.com/axsmap",
    youtube: "https://www.youtube.com/user/AXSMapTV",
  },
};
export default fr;
