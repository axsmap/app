const en = {
  // Common translations
  common: {
    optional: "(optional)",
    required: "(required)",
  },

  // Voice Review translations
  voiceReview: {
    startRecording: "Record Voice Review",
    stopRecording: "Stop Recording",
    processing: "Processing...",
    recordingInProgress: "Recording...",
    recordingInstructions: "Describe the accessibility features like entrance, ramps, elevator, bathroom, parking, etc.",
    processingTitle: "Processing...",
    processingDescription: "We're transcribing your recording and extracting accessibility information.",
    instructions: "Tap the button and describe the accessibility of this location. Mention entrance, ramps, steps, bathroom, elevator, parking, and any other features.",
    reviewPreview: "Review Preview",
    featuresDetected: "features detected",
    whatYouSaid: "What You Said",
    accessibilityFeatures: "Accessibility Features",
    reviewInstructions: "Review and adjust the detected features. Change any incorrect values.",
    additionalComments: "Additional Comments",
    commentsPlaceholder: "Add any additional details about accessibility...",
    characters: "characters",
    reRecord: "Re-record",
    submitReview: "Submit Review",
    submitting: "Submitting...",
    reviewTitle: "Review",
    close: "Close review form",
    dismissError: "Dismiss error",
    preferTyping: "Prefer typing?",
    fillManually: "Fill out the form manually",
    notSure: "Not Sure",
    yes: "Yes",
    no: "No",
    noSteps: "No Steps",
    oneStep: "1 Step",
    twoSteps: "2 Steps",
    threeOrMoreSteps: "3+ Steps",
    categories: {
      entrance: "Entrance",
      interior: "Interior",
      bathroom: "Bathroom",
      parking: "Parking",
    },
    fields: {
      steps: "Steps at Entrance",
      permanentRamp: "Permanent Ramp",
      portableRamp: "Portable Ramp",
      wideEntrance: "Wide Entrance",
      secondEntry: "Second Entry",
      multipleFloors: "Multiple Floors",
      elevator: "Accessible Elevator",
      wellLit: "Well Lit",
      brightLights: "Bright/Flashing Lights",
      accessibleBathroom: "Accessible Bathroom",
      grabBars: "Grab Bars",
      loweredSinks: "Lowered Sinks",
      parkingAvailable: "Parking Available",
      wheelchairParking: "Wheelchair Parking",
    },
    errors: {
      microphoneNotAllowed: "Microphone access is required. Please enable it in your browser settings.",
      microphoneNotFound: "No microphone found. Please connect a microphone and try again.",
      recordingFailed: "Failed to start recording. Please try again.",
      noAudio: "No audio recorded. Please try again.",
      tooShort: "Recording is too short. Please describe the accessibility features.",
      processingFailed: "Failed to process your voice review. Please try again.",
      submitFailed: "Failed to submit review. Please try again.",
    },
  },
  
  accountActivatedSuccessTitle: "Account Activated Successfully!",
  accountActivatedSuccessMessage:
    "Your account has been successfully activated. You can now log in.",
  goBackToLogin: "Go Back to Login Page",
  getMappingButton: "Get Mapping",
  mapathonJoinButton: "Join Mapathon",
  mapathonJoining: "Joining...",
  mapathonJoinSuccess: "You have successfully joined the mapathon!",
  mapathonJoinError: "Failed to join the mapathon. Please try again.",
  mapathonGetDirections: "Get Directions",
  contactUsTitle: "Contact Us",
  contactUsNameLabel: "Name",
  contactUsNamePlaceholder: "Enter your name",
  contactUsEmailLabel: "Email",
  contactUsEmailPlaceholder: "Enter your email",
  contactUsMessageLabel: "Message",
  contactUsMessagePlaceholder: "Enter a message",
  contactUsSendButton: "Send",
  contactUsSuccessMessage: "You have sent a message",
  contactUsErrorMessage: "An unexpected error occurred.",

  donateSectionTitle: "Donate",
  donorStatsTitle: "Donor Statistics",
  donorAboutTitle: "About Donors",

  // App Promo Popup
  appPromo: {
    title: "Get AXS Map on mobile",
    body: "Download the app for faster mapping and a smoother experience.",
    appStore: "App Store",
    googlePlay: "Google Play",
    notNow: "Not now",
    close: "Close",
  },

  editAccountTitle: "Edit Account Details",
  editAccountFirstNameLabel: "First Name",
  editAccountFirstNamePlaceholder: "Enter first name",
  editAccountLastNameLabel: "Last Name",
  editAccountLastNamePlaceholder: "Enter last name",
  editAccountGenderLabel: "Gender",
  editAccountGenderOptions: {
    male: "Male",
    female: "Female",
    other: "Other",
  },
  editAccountBirthdayLabel: "Birthday",
  editAccountDisabilityLabel: "Disability",
  editAccountRaceLabel: "Race",
  editAccountAboutMeLabel: "About Me",
  editAccountNewsletterLabel: "I want the AXS Newsletter",
  editAccountLanguageLabel: "Language",
  editAccountLanguageOptions: {
    english: "English",
  },
  editAccountPhoneNumberLabel: "Phone Number",
  editAccountPhoneNumberPlaceholder: "Enter phone number",
  editAccountShowDisabilitiesLabel: "Show my disabilities in profile",
  editAccountShowEmailLabel: "Show my email in profile",
  editAccountShowPhoneLabel: "Show my phone number in profile",
  editAccountUsernameLabel: "Username",
  editAccountZipLabel: "ZIP",
  editAccountZipPlaceholder: "Enter zip code",
  editAccountCancelButton: "Cancel",
  editAccountSaveButton: "Save",
  editAccountSuccessMessage: "User updated successfully",
  editAccountErrorMessage: "Error updating user",
  editAccountDeleteButton: "Delete Account",
  editAccountDeleteConfirmTitle: "Delete Account",
  editAccountDeleteConfirmMessage:
    "Are you sure you want to delete your account? This action cannot be undone.",
  editAccountDeleteConfirmButton: "Yes, Delete Account",
  editAccountDeleteCancelButton: "Cancel",
  editAccountDeleteSuccessMessage: "Account deleted successfully",
  editAccountDeleteErrorMessage: "Error deleting account",

  createAccountTitle: "Create Account",
  forgotPasswordTitle: "Reset Your Password",
  forgotPasswordDescription:
    "Enter your email address and we'll send you a link to reset your password.",
  forgotPasswordEmailLabel: "Email",
  forgotPasswordEmailPlaceholder: "Enter your email",
  forgotPasswordVerifyButton: "Verify Email",
  forgotPasswordSuccessMessage: "Password reset link sent to your email!",
  forgotPasswordErrorMessage: "An unexpected error occurred.",
  forgotPasswordBackToLogin: "Back to Login Page",

  loginTitle: "Login to Your Account",
  loginEmailLabel: "Email",
  loginEmailPlaceholder: "Enter your email",
  loginPasswordLabel: "Password",
  loginPasswordPlaceholder: "Enter your password",
  loginRememberMe: "Remember Me",
  loginForgotPassword: "Forgot password",
  loginButton: "Login",
  loginSuccessMessage: "Login Successfully",
  loginErrorMessage: "An unexpected error occurred.",
  loginAccountArchived: "Your account was archived due to inactivity. Please reactivate to continue.",
  loginOrLoginWith: "Or login with",
  loginGoogleButton: "Google",
  loginAppleButton: "Apple",
  loginNoAccount: "Don't have an account?",
  loginCreateAccount: "Create Account",

  resetPasswordTitle: "Set New Password",
  resetPasswordDescription: "Please enter your new password",
  resetPasswordLabel: "Password",
  resetPasswordPlaceholder: "Enter your new password",
  resetPasswordButton: "Set Password",
  resetPasswordSuccessMessage: "Password Reset Successfully",
  resetPasswordErrorMessage: "An unexpected error occurred.",
  resetPasswordBackToLogin: "Back to Login Page",

  mapathonDetailsParticipantsFrom: "participant from",
  mapathonDetailsParticipantsGoal: "participants",
  mapathonDetailsRanking: "ranked for reviews made",
  mapathonDetailsDateRangeFrom: "From",
  mapathonDetailsDateRangeTo: "to",
  mapathonDetailsProgress: "{progress}%",
  mapathonsTitle: "Mapathons",
  mapathonsActive: "Active",
  mapathonsInactive: "Inactive",
  mapathonsUpcoming: "Upcoming",
  mapathonsFilterAll: "All",
  mapathonsFilter10Miles: "10 miles",
  mapathonsFilter20Miles: "20 miles",
  mapathonsFilter50Miles: "50 miles",
  mapathonsCreateButton: "+ Create a Mapathon",
  mapathonsReviewsMade: "reviews made from",
  mapathonReviewsGoal: "reviews",
  mapathonsDateRangeFrom: "From",
  mapathonsDateRangeTo: "to",
  mapathonsLoadMore: "Load More",
  mapathonsLoading: "Loading...",
  mapathonsMyDrafts: "My Drafts",
  mapathonDraftBadge: "Draft",
  mapathonActionsTitle: "Mapathon Actions",
  mapathonPublishButton: "Publish Mapathon",
  mapathonPublishing: "Publishing...",
  mapathonPublishSuccess: "Mapathon published successfully!",
  mapathonPublishError: "Failed to publish mapathon. Please try again.",
  mapathonDeleteButton: "Delete Mapathon",
  mapathonDeleting: "Deleting...",
  mapathonDeleteSuccess: "Mapathon deleted successfully!",
  mapathonDeleteError: "Failed to delete mapathon. Please try again.",
  mapathonDeleteConfirmTitle: "Are you sure?",
  mapathonDeleteConfirmMessage: "This action cannot be undone. The mapathon and all its data will be permanently deleted.",
  mapathonDeleteConfirmButton: "Yes, Delete",
  mapathonDeleteCancelButton: "Cancel",
  mapathonDeleteDisabledTooltip: "This Mapathon can't be deleted because people have already participated.",
  mapathonDeleteDisabledShort: "Has participants",
  mapathonSaveAsDraft: "Save as Draft",
  mapathonCreateAndPublish: "Create & Publish",

  accountPageTitle: "My Account",
  accountRankedLabel: "Ranked",
  accountReviewsLabel: "Reviews",
  accountParticipationLabel: "Participation",
  accountDisabilitiesLabel: "Disabilities",
  accountUserNameLabel: "User Name",
  accountGenderLabel: "Gender",
  searchPlaceholderLabel: "Search by category & address (coffee, New York)",
  accountRaceLabel: "Race",
  accountAboutMeLabel: "About Me",
  accountDefaultAboutMe: "I am a software engineer.",
  accountSignOutButton: "Sign out",
  accountEditAccountButton: "Edit Account",

  teamsPageTitle: "Teams",
  teamsCreateButton: "+ Create New Team",
  teamsRankLabel: "Rank:",
  teamsReviewsLabel: "Reviews:",
  teamsMembersLabel: "Members:",
  teamsLoadMoreButton: "Load More",

  homeNoRatingsMessage: "This place has no ratings",
  homeAddReviewButton: "Add Review",
  homeLoadMoreButton: "Load More",

  authModalLoginTitle: "Login",
  authModalCreateAccountTitle: "Create Account",
  authModalForgotPasswordTitle: "Forgot Password",
  authModalCloseButton: "Close",

  cardNoImageAvailable: "No Image Available",
  cardEntranceLabel: "Entrance",
  cardInteriorLabel: "Interior",
  cardRestroomLabel: "Restroom",
  cardNoRatingsMessage: "This place has no ratings.",
  cardAddReviewButton: "Add a Review",

  // Venue page translations
  venue: {
    placeImageAlt: "Place Image",
    reviews: "reviews",
    accessibilityScores: "Accessibility Scores",
    entrance: "Entrance",
    interior: "Interior",
    restroom: "Restroom",
    address: "Address",
    phone: "Phone",
    website: "Website",
    hours: "Hours",
    axsReviewsHeading: "AXS Map Reviews ({{count}})",
    axsReviewsSubtext: "Community accessibility reviews from AXS Map users",
    googleReviewsHeading: "Google Reviews ({{count}})",
    googleReviewsSubtext: "General reviews from Google users",
    googleAttribution: "Reviews provided by Google",
    providedNoComment: "User provided accessibility ratings without a written comment.",
    noRatings: "Venue has no ratings",
  },

  reactivateAccount: {
    title: "Reactivate Your Account",
    description: "Your account was archived due to inactivity (no login for over 1 year). To reactivate, please set a new password and confirm your information.",
    newPasswordLabel: "New Password",
    newPasswordPlaceholder: "Enter your new password",
    newPasswordHelp: "8-30 characters",
    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter your new password",
    firstNameLabel: "First Name",
    firstNamePlaceholder: "Enter your first name",
    lastNameLabel: "Last Name",
    lastNamePlaceholder: "Enter your last name",
    emailLabel: "Email",
    emailPlaceholder: "Update your email address",
    phoneLabel: "Phone",
    phonePlaceholder: "Enter your phone number",
    zipLabel: "ZIP Code",
    zipPlaceholder: "Enter your ZIP code",
    submitButton: "Reactivate My Account",
    submitting: "Reactivating...",
    backToSignIn: "Back to Sign In",
    returnHome: "Return to Home",
    successMessage: "Your account has been reactivated! Welcome back.",
    socialLogin: {
      title: "Account Archived",
      description: "Your account has been archived due to inactivity. Since you originally signed up with {{provider}}, you'll need to contact our support team to reactivate your account.",
      whyTitle: "Why can't I reactivate automatically?",
      whyDescription: "For security reasons, accounts created with social login (Google/Facebook) cannot be reactivated through a password reset. Our support team will verify your identity to ensure your account's safety.",
      contactSupport: "Contact Support",
      backToHome: "Back to Home",
    },
    errors: {
      newPasswordRequired: "New password is required",
      passwordTooShort: "Password must be at least 8 characters",
      passwordTooLong: "Password must be less than 31 characters",
      confirmPasswordRequired: "Please confirm your password",
      passwordMismatch: "Passwords do not match",
      firstNameRequired: "First name is required",
      firstNameTooLong: "First name must be less than 25 characters",
      lastNameRequired: "Last name is required",
      lastNameTooLong: "Last name must be less than 37 characters",
      generalError: "Something went wrong. Please try again.",
      serverError: "Server error. The reactivation service may not be available yet. Please try again later or contact support.",
    },
  },

  mapathonDetailsOrganizer: "Organizer",
  mapathonDetailsParticipant: "Participant",
  mapathonDetailsOrganizerNotFound: "No organizer found",
  mapathonDetailsParticipantNotFound: "No Participant found",

  createAccountSuccessMessage:
    "Account created successfully. Please check your email for user activation.",
  createAccountErrorMessage: "An error occurred while creating the account.",
  stepOneFirstNameLabel: "First Name",
  stepOneFirstNamePlaceholder: "Enter your first name",
  stepOneLastNameLabel: "Last Name",
  stepOneLastNamePlaceholder: "Enter your last name",
  stepOneEmailLabel: "Email",
  stepOneEmailPlaceholder: "Enter your email",
  stepOnePasswordLabel: "Password",
  stepOnePasswordPlaceholder: "Enter your password",
  stepOneNextButton: "Next",
  stepOneAlreadyUserText: "Already a user?",
  stepOneSignInLink: "Sign in",
  stepTwoDisabilityLabel: "Disability",
  stepTwoDisabilityPlaceholder: "Enter your disabilities here",
  stepTwoRaceLabel: "Race",
  stepTwoRacePlaceholder: "Enter your race here",
  stepTwoBackButton: "Back",
  stepTwoNextButton: "Next",
  stepTwoAlreadyUserText: "Already a user?",
  stepTwoSignInLink: "Sign in",

  selectAnOption: "Select an option",
  yes: "Yes",
  no: "No",
  other: "Other",
  veryEasy: "Very Easy",
  easy: "Easy",
  notEasy: "Not Easy",
  veryHard: "Very Hard",
  impossible: "Impossible",

  // Review section titles
  sectionEntrance: "ENTRANCE",
  sectionInterior: "INTERIOR",
  sectionRestroom: "RESTROOM",
  sectionComment: "COMMENT",

  // Review steps
  selectMapathon: "Select Mapathon",
  selectMapathonError: "Please select a Mapathon first or click on skip button",
  applyMapathonLabel: "Apply this review to a Mapathon (optional)",
  doNotApplyMapathon: "Do not apply to a Mapathon",
  skip: "Skip",
  next: "Next",
  comment: "Comment",
  generateComment: "Generate Comment",
  generating: "Generating...",
  commentPlaceholder: "Write your comments, advice, tips, etc...",
  clearComment: "Clear comment",
  back: "Back",
  submit: "Submit",
  submitting: "Submitting...",

  // Survey labels
  "survey.featuresLabel": "What features do you use most on AXS Map?",
  "survey.navigationLabel": "How easy is it to navigate the app?",
  "survey.satisfactionLabel": "Are you satisfied with the app?",
  "survey.recommendLabel": "Would you recommend it to others?",

  stepThreeDescriptionLabel: "About Me",
  stepThreeDescriptionPlaceholder: "Enter details about yourself",
  stepThreeNewsletterLabel: "I want the AXS Newsletter",
  stepThreeBackButton: "Back",
  stepThreeCreateAccountButton: "Create Account",
  stepThreeOrCreateWithText: "Or create account with",
  stepThreeGoogleButton: "Google",
  stepThreeAppleButton: "Apple",
  stepThreeAlreadyUserText: "Already a user?",
  stepThreeSignInLink: "Sign in",

  createMapathonTitle: "Create A Mapathon",
  createMapathonNameLabel: "Name",
  createMapathonNamePlaceholder: "Name of your Mapathon",
  createMapathonDescriptionLabel: "Mapathon Description",
  createMapathonDescriptionPlaceholder: "Short Description here...",
  createMapathonLocationLabel: "Location",
  createMapathonLocationPlaceholder: "Enter Location",
  createMapathonMapLabel: "Mapathon Location Preview",
  createMapathonMapHelperText: "Location preview based on the address entered above",
  createMapathonDurationLabel: "Duration",
  createMapathonParticipantsLabel: "How many participants will be joining?",
  createMapathonParticipantsPlaceholder: "Number of participants",
  createMapathonReviewsLabel: "What’s your review goal?",
  createMapathonReviewsPlaceholder: "Number of reviews",
  createMapathonIsOpenLabel: "Make this Mapathon open to the public",
  createMapathonHostAsLabel: "Host As",
  createMapathonDonationEnabledLabel:
    "Yes! I want to make this a Fundraising Event for AXS Lab",
  createMapathonDonationGoalLabel: "Donation Goal",
  createMapathonDonationAmountsLabel: "Donation amounts (3 max)",
  createMapathonDonationAmountLabel: "Donation Amount",
  createMapathonSubmitButton: "Create Mapathon",
  createMapathonSuccessMessage: "Mapathon is created successfully",
  createMapathonErrorMessage: "An unexpected error occurred",
  createMapathonDraftSuccess: "Mapathon saved as draft successfully",
  createMapathonSaveDraft: "Save as Draft",
  createMapathonPublishButton: "Create & Publish",

  createTeamTitle: "Create Your Team",
  editTeamTitle: "Edit Your Team",
  createTeamNameLabel: "Name",
  createTeamNamePlaceholder: "Name of your Team",
  createTeamDescriptionLabel: "Description",
  createTeamDescriptionPlaceholder: "Short Description here...",
  createTeamAvatarLabel: "Add Avatar",
  createTeamAvatarFileTypeDescription: "Files should be less than 5MB.",
  createTeamSubmitButton: "Create Team",
  editTeamSubmitButton: "Update Team",
  createTeamCancelButton: "Cancel",
  createTeamSuccessMessage: "Team created successfully",
  editTeamSuccessMessage: "Team updated successfully",
  createTeamPhotoUploadSuccess: "Photo uploaded successfully",
  createTeamPhotoUploadError: "Failed to upload photo",

  faqTitle: "FAQ",
  faqVideoTitle: "AXS Map: Join the Movement Today",
  faqHowToRateVenueTitle: "How do I rate a place?",
  faqHowToRateVenueDescription:
    "AXS Map takes you through an intuitive rating process, but consider the following criteria when rating a place:",
  faqHowToRateVenueEntrance:
    "Entrance – does the entrance have steps, a ramp, reserved parking, a second entrance, or a wide entrance?",
  faqHowToRateVenueInterior:
    "Interior – does the interior have room to move, a ramp, an accessible elevator, or an accessible table height?",
  faqHowToRateVenueRestroom:
    "Restroom – does the restroom door swing out, have large stalls, supports around the toilet, or lowered sinks?",
  faqHowToRateVenueOther:
    "Other – is the place well-lit, have a high noise level, or allow service dogs?",
  faqAddPlaceTitle: "Can I add a place that's not on AXS Map?",
  faqAddPlaceDescription:
    "No - AXS Map pulls from the Google Places database to populate its maps. Google Places is working to catalogue businesses around the world. If a place is missing, we recommend submitting an inquiry to Google.",
  faqNeighborhoodTitle:
    "In my neighborhood or city, there are a lot of places that haven't been reviewed. What should I do?",
  faqNeighborhoodDescription:
    "We need communities to band together to map their neighborhoods. At AXS Map we’ve started a special tool to help you and your community do this. It's called the 'Mapathons' tool, & you should check it out!",
  faqReviewPlacesTitle: "Can I review places where I don't live?",
  faqReviewPlacesDescription:
    "Absolutely. If you have been to a place and have a good memory of it (perhaps it's a place you frequent) feel free to give a review!",
  faqRegistrationTitle: "Do I have to register in order to use AXS Map?",
  faqRegistrationDescription:
    "No, you do not need to join in order to use AXS Map. Without joining, you will still be able to see all the reviews on AXS Map, and you will have full access to everything on our maps. But if you would like to give reviews we will need you to join first. Joining is free and easy, & all information you provide to AXS Map will remain anonymous.",
  faqFindPlaceTitle:
    "How do I find a place I want to review on the AXS Map database?",
  faqFindPlaceIntro: "There are several ways to find a place on AXS Map.",
  faqFindPlaceSearchBoxes:
    "On the main page for AXS Map you will see two search boxes. If you are looking for 'Joe's Coffee' in Biloxi, Louisiana, then you would type in 'Joe's Coffee' in the left search bar and 'Biloxi, Louisiana' in the search bar on the right.",
  faqFindPlaceSearchEverything:
    "Another approach is to search 'Everything' in the left searchbar and then on the right input an address at or nearby your location.",
  faqFindPlaceGoogleDatabase:
    "If you've tried these Search approaches and can't find the place you'd like to review, it may be that the Google Places database has not indexed that business.",
  faqMapathonProcessTitle: "What's the process for a Mapathon™?",
  faqMapathonAnimationPrompt:
    "Have you watched our Mapathon animation? If not, then see it here.",
  faqMapathonVideoTitle: "AXS Map: Join the Movement Today",
  faqMapathonToolkitTitle: "Mapathon Toolkit",
  faqToolkitPaperFormsTitle: "Paper review forms:",
  faqToolkitPaperFormsDescription:
    "These forms allow your participants to enter reviews on paper. This is a good thing to have in case someone’s phone doesn’t work or in case a participant doesn’t have a phone.",
  faqToolkitBrochureTitle: "Brochure for handing out to businesses:",
  faqToolkitBrochureDescription:
    "When your Mapathon participants are out roaming the neighborhoods, sometimes it can be a bit startling to a business owner when they request to ‘see’ their bathroom.",
  faqToolkitHowToRateTitle: "How to rate:",
  faqToolkitHowToRateDescription:
    "Guidance on Giving Reviews - Some of your participants may like to see some guidance on giving reviews.",
  faqMapathonStepsIntro: "These are the steps for a typical Mapathon:",
  faqMapathonSteps: [
    {
      title: "Schedule the Mapathon:",
      description:
        "We recommend setting a 4-hour period for a Saturday or Sunday.",
    },
    {
      title: "Invite people to participate:",
      description: "Invite as many people to your Mapathon as possible.",
    },
    {
      title: "Kickoff the Mapathon:",
      description:
        "It’s usually best for everyone to meet in one spot for a kickoff.",
    },
    {
      title: "Divide into teams:",
      description:
        "Divide participants into teams and assign them specific areas to review.",
    },
    {
      title: "Provide tools and instructions:",
      description:
        "Ensure participants have the AXS Map app and understand how to use it.",
    },
    {
      title: "Start reviewing:",
      description:
        "Teams should visit their assigned areas and start reviewing places.",
    },
    {
      title: "Regroup and share experiences:",
      description:
        "After the Mapathon, regroup to share experiences and feedback.",
    },
    {
      title: "Submit reviews:",
      description: "Ensure all reviews are submitted to the AXS Map platform.",
    },
    {
      title: "Celebrate and thank participants:",
      description:
        "Celebrate the success of the Mapathon and thank everyone for their participation.",
    },
  ],

  termsTitle: "Terms & Conditions",
  termsLastUpdated: "Last Updated: May 19, 2021.",
  termsIntro:
    "By using the websites and mobile applications of AXS Map, you are agreeing to the following terms and conditions. Please read them carefully.",
  termsDescription1:
    "These terms and conditions (the 'Terms') govern your access to and use of AXS Lab's website located at www.axsmap.com (the 'Site'). By accessing or using the Site, you are agreeing to these Terms and concluding a legally binding contract with AXS Lab Inc. ('AXS'). AXS Lab Inc. is a registered 501(c)3 nonprofit. Do not access or use the Site if you are unwilling or unable to be bound by the following Terms.",
  termsDescription2:
    "THESE TERMS SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS THAT GOVERN YOUR USE OF THE SITE. BY ACCESSING OR USING THE SITE, YOU ARE ACCEPTING THESE TERMS, AND YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS. IF YOU DO NOT AGREE WITH ALL OF THE PROVISIONS OF THESE TERMS, DO NOT ACCESS AND/OR USE THE SITE.",
  termsDefinitionsTitle: "1. Definitions",
  termsDefinitionsPartiesTitle: "A. Parties",
  termsDefinitionsPartiesDescription:
    "'You' and 'your' refer to you as user of the Site. A 'user' is someone who accesses, browses, or in any way uses the Site. 'We', 'us', and 'our' refer to AXS.",
  termsDefinitionsContentTitle: "B. Content",
  termsDefinitionsContentDescription:
    "'Content' means text, images, photos, audio, video, location data, and all other forms of data or communication. 'Your Content' means Content that you submit or transmit to, through, or in connection with the Site...",
  termsChangesTitle: "2. Changes to the Terms of Service",
  termsChangesDescription:
    "We may modify the Terms from time to time. When changes are made, we will notify you by making the revised version available on this webpage...",
  termsUsingSiteTitle: "3. Using the Site",
  termsEligibilityTitle: "A. Eligibility",
  termsEligibilityDescription1:
    "To access or use the Site, you must be 13 years or older and have the requisite power and authority to enter into these Terms...",
  termsEligibilityDescription2:
    "You may not use the Site and may not accept the Terms if (a) you are not of legal age to form a binding contract with AXS...",
  termsUsersUnder18Title: "Users Under the Age of 18",
  termsUsersUnder18Description1:
    "The Site is not targeted to users under 13 years of age. If you are under 13 years of age, you will not be permitted to create an account...",
  termsUsersUnder18Description2:
    "If you are under 18, by using the Site you are representing (i.e. making a promise) that you are acting with consent from your parent/guardian...",
  termsUsersUnder18Description3:
    "If we are told by a parent/guardian that their child has lied about their age when creating an account, we will remove the account...",
  termsPermissionTitle: "B. Permission to Use the Site",
  termsPermissionDescription:
    "Subject to these Terms, we grant you a personal, non-exclusive, non-transferable, limited and revocable right to access and use...",
  termsSiteAvailabilityTitle: "C. Site Availability",
  termsSiteAvailabilityDescription:
    "The Site may be modified, updated, interrupted, suspended, or discontinued at any time without notice or liability.",
  termsUserAccountsTitle: "D. User Accounts",
  termsUserAccountsDescription1:
    "You may create an account and provide certain personal information about yourself in order to use some of the features...",
  termsUserAccountsDescription2:
    "Your account is for your personal, non-commercial use only. In creating it, we ask that you provide complete and accurate information...",
  termsCommunicationsTitle: "E. Communications from AXS and Other Users",
  termsCommunicationsDescription:
    "By creating an account, you agree to receive certain communications in connection with the Site...",
  termsContentTitle: "4. Content",
  termsResponsibilityTitle: "A. Responsibility for Your Content",
  termsResponsibilityDescription1:
    "You alone are responsible for Your Content, and once published, it cannot always be withdrawn...",
  termsResponsibilityDescription2:
    "You may expose yourself to liability if, for example, Your Content contains material that is false, intentionally misleading...",
  termsOurRightTitle: "B. Our Right to Use Your Content",
  termsOurRightDescription:
    "We may use Your Content in a number of different ways, including publicly displaying it, reformatting it...",
  termsOwnershipTitle: "C. Ownership",
  termsOwnershipDescription:
    "As between you and AXS, you own Your Content. We own the AXS Content, including but not limited to visual interfaces...",
  termsAdvertisingTitle: "D. Advertising",
  termsAdvertisingDescription:
    "AXS and its licensees may publicly display advertisements and other information adjacent to or included with Your Content...",
  termsMapathonsTitle: "E. Mapathons",
  termsMapathonsDescription1:
    "In the event that you participate in, create, organize, or otherwise attend a Mapathon event...",
  termsMapathonsDescription2:
    "You assume all risks when participating in a Mapathon. All participants must use care and good judgment...",
  termsMapathonsDescription3:
    "You will defend, indemnify and hold harmless AXS and Mapathon organizers, AXS directors, employees...",
  termsPersonalInfoTitle: "F. Personal Information",
  termsPersonalInfoDescription:
    "We process personal information collected in and through the Site in accordance with the Privacy Notice available on the Site.",
  termsOtherTitle: "G. Other",
  termsOtherDescription:
    "User Content does not necessarily reflect the opinion of AXS. AXS does not necessarily review User Content...",
  termsRestrictionsTitle: "5. Restrictions",
  termsRestrictionsDescription:
    "We are under no obligation to enforce the Terms on your behalf against another user...",
  termsQuestionsTitle: "15. Questions",
  termsQuestionsDescription:
    "If you have any questions regarding these Terms, please email us at: axsmap@axslab.org",

  footerCopyright: "AXS MAP",
  footerFAQ: "FAQ",
  footerShop: "Shop",
  footerPrivacyPolicy: "Privacy Policy",
  footerTermsConditions: "Terms & Conditions",
  footerContact: "Contact",
  footerFacebookLink: "https://www.facebook.com/axsmap",
  footerTwitterLink: "https://twitter.com/axsmap",
  footerYouTubeLink: "https://www.youtube.com/axsmaptv",
  footerFacebookAlt: "facebook",
  footerTwitterAlt: "twitter",
  footerYouTubeAlt: "youtube",

  infoModalLogoAlt: "AXS Map Logo",
  infoModalBannerAlt: "AXS Main Banner",
  infoModalWelcomeTitle: "Welcome to AXS Map,",
  infoModalWelcomeDescription:
    "A tool designed to help us map inclusion in communities and find more places for more people.",
  infoModalRatingSystemTitle: "The Rating SYSTEM",
  infoModalRatingSystemDescription:
    "Our icon system lets you determine at a glance how users have rated a place for accessibility, across three different phases.",
  infoModalVenuePhasesTitle: "PLACE PHASES",
  infoModalEntranceAlt: "Entrance Icon",
  infoModalEntranceLabel: "ENTRANCE",
  infoModalInteriorAlt: "Interior Icon",
  infoModalInteriorLabel: "INTERIOR",
  infoModalRestroomAlt: "Restroom Icon",
  infoModalRestroomLabel: "RESTROOM",
  infoModalColorSystemTitle: "COLOR SYSTEM",
  infoModalAccessibleLabel: "ACCESSIBLE",
  infoModalCautionLabel: "CAUTION",
  infoModalAlertLabel: "ALERT",
  infoModalFullyAccessibleTitle: "RATED FULLY ACCESSIBLE",

  loginFacebookButton: "Facebook",
  teamBannerAlt: "Team Banner",
  teamRankLabel: "Rank",
  teamReviewsLabel: "Reviews",
  teamMapathonLabel: "Mapathon",
  teamMapathonName: "La Vida Scholars Lynn AXS Mapathon",
  teamShareLabel: "Share:",
  teamJoinButton: "+ Join Team",
  teamEditButton: "Edit Team",
  teamJoinRequestSuccess: "Request has been sent to join the team",
  noRecordFound: "No Record found!",
  headerLogoAlt: "AXS Map Logo",
  headerPlaces: "Places",
  headerMapathons: "AXS Mapathons",
  headerTeams: "Teams",
  headerDonate: "Donate",
  headerAboutUs: "About Us",
  headerSignIn: "Sign In",
  headerMyAccount: "My Account",
  headerUserAvatarAlt: "User Avatar",

  languageEnglish: "English",
  languageFrench: "Français",
  languageSpanish: "Español",
  languageJapanese: "日本語",

  createTeamNameRequired: "Team Name is reqired",
  createTeamNameUnique: "Name must be unique",

  ThankYouReviewClose: "Close",
  ThankYouReviewDetailsHeader: "Thank you",
  ThankYouReviewDefaultPageTitle: "Review Thank You | AXS Map",
  ThankYouReviewDetailsPageTitle: "More places, for more people.",
  ThankYouReviewNotFoundPageTitle: "ThankYouReview not found | AXS Map",
  ThankYouReviewDetailsPageDescription:
    "Thank you for contributing to the AXS Map community. With your help and knowledge, we're one rating closer to a world with more of the experiences we love - experiences for everyone",
  ThankYouReviewRatingsHeader: "You have rated:",
  ThankYouReviewTextPlaceholder: "Review this place to add photos",
  ThankYouReviewItemsPlaceholder: "items",
  ThankYouReviewLocationsPlaceholder: "locations",

  copyright: "2025 AXS MAP",
  faq: "FAQ",
  shop: "Shop",
  privacyPolicy: "Privacy Policy",
  termsConditions: "Terms & Conditions",
  contact: "Contact",
  facebookAlt: "facebook",
  twitterAlt: "twitter",
  youtubeAlt: "youtube",

  title: "Privacy Policy",
  lastUpdated: "Last Updated: April 23, 2022.",
  generalTitle: "I. General",
  generalDescription:
    "AXS Lab Inc. and its affiliates (collectively, “we,” “our,” “us,” or “AXS”) owns and operates www.axsmap.com (the “Site”) and we are committed to protecting your privacy and Personal Information...",
  personalInfoTitle: "II. What Personal Information Do We Collect?",
  registerTitle: "a) When You Register on the Site",
  registerDescription:
    "When you register on the Site, we collect the following identifiers that may, alone or in combination with other information, constitute Personal Information:",
  registerList: [
    "Name",
    "E-mail",
    "Password",
    "Address",
    "Your newsletter subscription choice",
  ],
  communicateTitle: "b) When You Communicate With Us",
  communicateDescription:
    "When you communicate with us in and through the Site, e-mail us, or otherwise communicate with us, we collect the following identifiers that may, alone or in combination with other information, constitute Personal Information:",
  communicateList: [
    "Name",
    "Contact information such as email address and a street address",
    "Content of communications sent to us",
  ],
  requestInfoTitle: "c) When You Request Information From Us",
  requestInfoDescription:
    "When you use the “Contact” function on the Site, we collect the following identifiers that may, alone or in combination with other information, constitute Personal Information:",
  requestInfoList: [
    "Name",
    "Contact information such as e-mail address",
    "Content of communications sent to us",
  ],
  dataRequestTitle: "d) Data Request and Deletion",
  dataRequestDescription: "You have the right under this Privacy Policy to:",
  dataRequestList: [
    "Request access to Your Personal Data.",
    "Request correction of the Personal Data that We hold about You.",
    "Request erasure of Your Personal Data.",
    "Request the transfer of Your Personal Data.",
    "Withdraw Your consent.",
  ],
  surveysTitle: "e) Surveys, Sweepstakes, and Promotions",
  surveysDescription:
    "You may be able to participate in surveys, sweepstakes and other promotions on the Site (collectively “Promotions”). If you choose to participate in the Promotions, we may collect the following identifiers that may, alone or in combination with other information, constitute Personal Information:",
  surveysList: [
    "Name",
    "Contact information such as e-mail address, postal address and phone number",
  ],
  internetActivityTitle: "f) Internet Activity Information",
  internetActivityDescription:
    "Software used on the Site collects Internet or other electronic network activity information that may, alone or in combination with other information, constitute Personal Information:",
  internetActivityList: [
    "The domain from which you access the Site",
    "The type of browser and operating system used in the device you use to access the Site",
    "Internet Protocol (IP) address",
    "The date and time you visited the Site (time stamp)",
    "The pages browsed on the Site",
    "The website used to link to the Site from",
    "Any search terms used to navigate the Site",
    "Products purchased and viewed on the Site",
    "A browsing session ID",
    "Whether you are a first-time visitor to the Site",
  ],
  sourcesTitle: "III. The Sources of Personal Information",
  sourcesDescription:
    "We collect Personal Information from the following categories of sources:",
  sourcesList: [
    "You: When you voluntarily provide Personal Information to us",
    "Third party identity management providers such as Facebook or Google",
    "Software: Information automatically collected via cookies, web logs, web beacons, and other software-based analytics tools",
  ],
  purposesTitle: "IV. Why We Collect Personal Information About You",
  purposesDescription:
    "We use Personal Information about you for the following purposes:",
  purposesList: [
    "To operate and improve our Site, including through analytics to help us understand how you use the Site, so that we can present content in the best manner",
    "To provide the services, such as the ability to organize Mapathons, made available on the Site",
    "To provide you with any information that you request from us",
    "To notify you about changes to the Site",
    "To enable us to issue a notice, administrative, or corrective action to you in relation to the Site, if required",
    "To send you direct marketing messages that you have consented to receive",
    "To protect against, identify and prevent fraud and other unlawful activity, claims and other liabilities",
    "To comply with applicable legal requirements, industry standards, and our own policies",
    "Where permitted by law, to provide you with information about other products and services we offer that are similar to those that you have already subscribed to or enquired about and we feel may interest you",
  ],

  discloseTitle: "V. How We Disclose Personal Information",
  discloseDescription:
    "We may disclose the following categories of Personal Information with the following categories of third parties for business purposes:",
  discloseTableHeaders: {
    categoryOfInfo: "Category of Personal Information",
    categoryOfThirdParty: "Category of Third Party",
  },
  discloseTableRows: [
    {
      personalInfo: [
        "Identifiers",
        "Internet activity information",
        "Professional information",
      ],
      thirdParty: ["Our affiliates (such as subsidiaries that we own)"],
    },
    {
      personalInfo: [
        "Identifiers",
        "Professional information",
        "Internet activity information",
      ],
      thirdParty: [
        "Service providers: We use services providers such as website hosting and management companies, and data storage and data analysis companies. Such service providers can only use Personal Information to provide such services to us and for no other purpose.",
      ],
    },
    {
      personalInfo: [
        "Identifiers",
        "Professional information",
        "Internet activity information",
      ],
      thirdParty: [
        "Parties to a corporate transaction or proceeding: In the event of a corporate sale, merger, reorganization, bankruptcy, dissolution or similar event, Personal Information may be part of the transferred assets.",
      ],
    },
    {
      personalInfo: ["Identifiers", "Professional information"],
      thirdParty: [
        "Public authorities and legal proceedings: AXS may disclose Personal Information about you to government or law enforcement officials or private parties as required by law, and disclose and use such information as we believe necessary or appropriate to (a) comply with applicable laws and lawful requests and legal process, such as to respond to subpoenas or requests from government authorities; (b) enforce the terms and conditions that govern the Site; (d) protect our rights, privacy, safety or property, and/or that of you or others; and (e) protect, investigate and deter against fraudulent, harmful, unauthorized, unethical or illegal activity.",
      ],
    },
  ],

  californiaRightsTitle: "VI. California Privacy Rights",
  californiaRightsIntro:
    "California Civil Code Section 1798.83 permits the users of the Site who are California residents to request certain information regarding our disclosure of Personal Information to third parties for their direct marketing purposes. To make such a request, please contact us at",
  californiaRightsEmail: "axsmaps@axslab.org",

  dataRetentionTitle: "VII. Data Retention",
  dataRetentionDescription:
    "We will only retain Personal Information about you for as long as necessary to fulfill the purposes Personal Information was collected for, including the purposes of satisfying any legal, accounting or reporting requirements. To determine the appropriate retention period for Personal Information, we consider the amount, nature, and sensitivity of the Personal Information, the potential risk of harm from unauthorized use or disclosure of Personal Information, the purposes for which we process Personal Information and whether we can achieve those purposes through other means, and applicable legal requirements.",

  linksTitle: "VIII. Links to Other Websites",
  linksDescription:
    "The Site may contain links to other websites of interest. However, once you have used these links to leave the Site, we do not have any control over third party websites. We cannot be responsible for the protection and privacy of any Personal Information which you provide whilst visiting such sites and such sites are not governed by this Privacy Notice. You should exercise caution and review the privacy notice applicable to the website in question.",

  childrenTitle: "IX. Children",
  childrenDescription:
    "The Site and the Services are not intended for children under the age of 16. Accordingly, we do not intend to collect Personal Information from anyone we know to be under 16 years of age. We do not intentionally collect, sell, or process the Personal Information of individuals under 16 years of age.",

  cookiesTitle: "X. How Do We Use Cookies?",
  cookiesDescription:
    "Some of the features on the Site require the use of 'cookies' - small text files that are stored on your device's hard drive. We use cookies to measure which pages are being accessed, and which features are most frequently used. This enables us to continuously improve the Site to meet the needs of our visitors.",
  cookiesTableHeaders: {
    type: "Type of Cookies",
    description: "Description",
    managingSettings: "Managing Settings",
  },
  cookiesTableRows: [
    {
      type: "Required cookies",
      description:
        "Required cookies enable you to navigate the Site and use its features, such as accessing secure areas of the Site and using our services. If you have chosen to identify yourself to us, we use cookies containing encrypted information to allow us to uniquely identify you. These cookies allow us to uniquely identify you when you are logged into the Site and to process your online transactions and requests.",
      managingSettings:
        "Because required cookies are essential to operate the Site, there is no option to opt out of these cookies.",
    },
    {
      type: "Performance cookies",
      description:
        "These cookies collect information about how you use the Site, including which pages you go to most often and if they receive error messages from certain pages. These cookies do not collect information that individually identifies you. Information is only used to improve how the Site functions and performs.",
      managingSettings:
        "To learn how to opt out of performance cookies using your browser settings, click here. To learn how to manage privacy and storage settings for Flash cookies, click here.",
    },
    {
      type: "Functionality cookies",
      description:
        "Functionality cookies allow the Site to remember information you have entered or choices you make (such as your username, language, or your region) and provide enhanced, more personal features.",
      managingSettings:
        "To learn how to opt out of functionality cookies using your browser settings, click here. To learn how to manage privacy and storage settings for Flash cookies, click here.",
    },
  ],

  securityTitle: "XI. Security",
  securityDescription:
    "We take reasonable and appropriate measures to protect Personal Information from loss, misuse and unauthorized access, disclosure, alteration and destruction, taking into account the risks involved in the processing and the nature of the Personal Information. Despite these efforts, we cannot guarantee the security of Personal Information during its transmission or its storage on our systems.",

  changesTitle: "XII. Changes to This Notice",
  changesDescription:
    "This Privacy Notice may change from time to time, effective from the date mentioned in the updated version of the Privacy Notice. You can tell when this Privacy Notice was last updated by reviewing the Last Updated legend at the top of this page. Please check the Site periodically to review such changes in the Privacy Notice.",

  dntTitle: "XIII. Do Not Track (‘DNT’) Settings",
  dntDescription:
    "California law requires us to let you know how we respond to web browser Do Not Track (DNT) signals. Because there currently isn’t an industry or legal standard for recognizing or honoring DNT signals, we don’t respond to them at this time.",

  PrivacyPolicyContactUsTitle: "XIV. Contact Us",
  contactUsDescription:
    "If you have any questions or concerns about this Privacy Notice or about our privacy or data security practices, please contact us via the following:",
  contactUsEmail: "axsmap@axslab.org",

  donationTitle: "Open more doors for more people",
  description:
    "By donating, you're enabling AXS Lab to do the work we do best — bringing people together and creating a world for everyone. Donations mean growing accessibility freedom for all, and helping real people — millions of them — in very real ways.",
  donateOnce: "Donate Once",
  donateMonthly: "Donate Monthly",
  chooseAmount: "Choose an amount to donate",
  amounts: {
    25: "$25",
    50: "$50",
    100: "$100",
    other: "Other Amount",
  },
  donateButton: "Donate",

  DonorAboutTitle: "Get to know Jason Dasilva",
  DonorAboutDescription:
    "When diagnosed with primary progressive multiple sclerosis at 25, filmmaker Jason Dasilva turned to art and storytelling, winning an Emmy for the film that told his journey from canes to walker, to wheelchair, When I Walk. Today, Jason is an acclaimed director, producer, writer, disability rights activist, and founder of AXS Lab. His goal? To spread awareness through stories, tools, and art, ultimately growing the world to include more experiences and more freedom for everyone.",
  viewFilmsButton: "View More of Jason’s Films",
  socialLinks: {
    facebook: "https://www.facebook.com/axsmap",
    twitter: "https://twitter.com/axsmap",
    youtube: "https://www.youtube.com/@AXSLab",
  },
  donorImageAlt: "Jason Dasilva",

  // Stats Bar
  statsRegisteredUsers: "Registered Users",
  statsMapathonsCities: "Mapathons in Major Cities",
  statsCountries: "Countries Around the World",
};
export default en;
