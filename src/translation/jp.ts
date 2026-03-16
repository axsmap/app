const jp = {
  // Common translations
  common: {
    optional: "（任意）",
    required: "（必須）",
  },

  // Voice Review translations
  voiceReview: {
    title: "音声レビュー",
    startRecording: "録音を開始",
    stopRecording: "録音を停止",
    recording: "録音中...",
    processing: "レビューを処理中...",
    recordingHint: "タップしてアクセシビリティレビューの録音を開始",
    speakHint: "場所のアクセシビリティ機能を説明してください",
    maxDuration: "最大2分",
    browserNotSupported: "お使いのブラウザは音声録音をサポートしていません",
    microphoneError: "マイクにアクセスできません。権限を確認してください。",
    processingError: "録音の処理中にエラーが発生しました。もう一度お試しください。",
    networkError: "ネットワークエラー。接続を確認してもう一度お試しください。",
    tryAgain: "再試行",
    cancel: "キャンセル",
    submit: "レビューを送信",
    previewTitle: "レビューのプレビュー",
    editReview: "レビューを編集",
    transcription: "書き起こし",
    extractedReview: "抽出されたレビュー",
    confidence: "信頼度",
    confidenceHigh: "高",
    confidenceMedium: "中",
    confidenceLow: "低",
    fieldsExtracted: "{{total}}フィールド中{{count}}フィールドを抽出",
    entrance: "入口",
    interior: "内装",
    bathroom: "トイレ",
    parking: "駐車場",
    steps: "段差",
    permanentRamp: "固定スロープ",
    portableRamp: "携帯スロープ",
    wideEntrance: "広い入口",
    automaticDoor: "自動ドア",
    accessiblePath: "アクセス可能な通路",
    wideInterior: "広い内装",
    accessibleTable: "アクセス可能なテーブル",
    accessibleBathroom: "アクセス可能なトイレ",
    singleOccupancy: "個室",
    loweredSinks: "低い洗面台",
    grabBars: "手すり",
    accessibleParking: "アクセス可能な駐車場",
    parkingSpots: "駐車スペース",
    hasParkingLot: "駐車場あり",
    hasStreetParking: "路上駐車あり",
    hasValidatedParking: "駐車場認証あり",
    comments: "コメント",
    yes: "はい",
    no: "いいえ",
    notMentioned: "言及なし",
    stepsCount: "{{count}}段",
    reviewSubmitted: "レビューが正常に送信されました！",
    submitError: "レビューの送信中にエラーが発生しました。もう一度お試しください。",
  },

  accountActivatedSuccessTitle: "アカウントが正常に有効化されました！",
  accountActivatedSuccessMessage:
    "アカウントが正常に有効化されました。これでログインできます。",
  goBackToLogin: "ログインページに戻る",

  reactivateAccount: {
    title: "アカウントを再有効化",
    description: "お客様のアカウントは1年以上ログインがなかったため、アーカイブされました。再有効化するには、新しいパスワードを設定し、情報を確認してください。",
    newPasswordLabel: "新しいパスワード",
    newPasswordPlaceholder: "新しいパスワードを入力",
    newPasswordHelp: "8〜30文字",
    confirmPasswordLabel: "パスワードを確認",
    confirmPasswordPlaceholder: "新しいパスワードを再入力",
    firstNameLabel: "名",
    firstNamePlaceholder: "名を入力",
    lastNameLabel: "姓",
    lastNamePlaceholder: "姓を入力",
    emailLabel: "メール",
    emailPlaceholder: "メールアドレスを更新",
    phoneLabel: "電話番号",
    phonePlaceholder: "電話番号を入力",
    zipLabel: "郵便番号",
    zipPlaceholder: "郵便番号を入力",
    submitButton: "アカウントを再有効化",
    submitting: "再有効化中...",
    backToSignIn: "ログインに戻る",
    returnHome: "ホームに戻る",
    successMessage: "アカウントが再有効化されました！おかえりなさい。",
    socialLogin: {
      title: "アカウントがアーカイブされました",
      description: "お客様のアカウントは非アクティブのためアーカイブされました。{{provider}}で登録されたため、アカウントを再有効化するにはサポートチームにお問い合わせください。",
      whyTitle: "自動的に再有効化できないのはなぜですか？",
      whyDescription: "セキュリティ上の理由から、ソーシャルログイン（Google/Facebook）で作成されたアカウントは、パスワードリセットで再有効化できません。サポートチームがお客様の身元を確認し、アカウントの安全性を確保します。",
      contactSupport: "サポートに連絡",
      backToHome: "ホームに戻る",
    },
    errors: {
      newPasswordRequired: "新しいパスワードは必須です",
      passwordTooShort: "パスワードは8文字以上である必要があります",
      passwordTooLong: "パスワードは30文字以下である必要があります",
      confirmPasswordRequired: "パスワードを確認してください",
      passwordMismatch: "パスワードが一致しません",
      firstNameRequired: "名は必須です",
      firstNameTooLong: "名は24文字以下である必要があります",
      lastNameRequired: "姓は必須です",
      lastNameTooLong: "姓は36文字以下である必要があります",
      generalError: "エラーが発生しました。もう一度お試しください。",
      serverError: "サーバーエラー。再有効化サービスはまだ利用できない可能性があります。後でもう一度お試しいただくか、サポートにお問い合わせください。",
    },
  },

  getMappingButton: "マッピングを取得",
  mapathonJoinButton: "マパソンに参加",
  mapathonJoining: "参加中...",
  mapathonJoinSuccess: "マパソンに参加しました！",
  mapathonJoinError: "マパソンへの参加に失敗しました。もう一度お試しください。",
  mapathonGetDirections: "道順を取得",
  contactUsTitle: "お問い合わせ",
  contactUsNameLabel: "名前",
  contactUsNamePlaceholder: "名前を入力してください",
  contactUsEmailLabel: "メール",
  contactUsEmailPlaceholder: "メールを入力してください",
  contactUsMessageLabel: "メッセージ",
  contactUsMessagePlaceholder: "メッセージを入力してください",
  contactUsSendButton: "送信",
  contactUsSuccessMessage: "メッセージが送信されました",
  contactUsErrorMessage: "予期しないエラーが発生しました。",

  donateSectionTitle: "寄付する",
  donorStatsTitle: "寄付者の統計",
  donorAboutTitle: "寄付者について",

  // App Promo Popup
  appPromo: {
    title: "AXS Mapアプリをダウンロード",
    body: "アプリをダウンロードして、より速いマッピングとスムーズな体験をお楽しみください。",
    appStore: "App Store",
    googlePlay: "Google Play",
    notNow: "今はしない",
    close: "閉じる",
  },

  editAccountTitle: "アカウント詳細を編集",
  editAccountFirstNameLabel: "名",
  editAccountFirstNamePlaceholder: "名を入力してください",
  editAccountLastNameLabel: "姓",
  editAccountLastNamePlaceholder: "姓を入力してください",
  editAccountGenderLabel: "性別",
  editAccountGenderOptions: {
    male: "男性",
    female: "女性",
    other: "その他",
  },
  editAccountBirthdayLabel: "誕生日",
  editAccountDisabilityLabel: "障害",
  editAccountRaceLabel: "人種",
  editAccountAboutMeLabel: "自己紹介",
  editAccountNewsletterLabel: "AXSのニュースレターを受け取る",
  editAccountLanguageLabel: "言語",
  editAccountLanguageOptions: {
    english: "英語",
  },
  editAccountPhoneNumberLabel: "電話番号",
  editAccountPhoneNumberPlaceholder: "電話番号を入力してください",
  editAccountShowDisabilitiesLabel: "プロフィールに障害を表示する",
  editAccountShowEmailLabel: "プロフィールにメールアドレスを表示する",
  editAccountShowPhoneLabel: "プロフィールに電話番号を表示する",
  editAccountUsernameLabel: "ユーザー名",
  editAccountZipLabel: "郵便番号",
  editAccountZipPlaceholder: "郵便番号を入力してください",
  editAccountCancelButton: "キャンセル",
  editAccountSaveButton: "保存",
  editAccountSuccessMessage: "ユーザー情報が正常に更新されました",
  editAccountErrorMessage: "ユーザー情報の更新中にエラーが発生しました",
  editAccountDeleteButton: "アカウントを削除",
  editAccountDeleteConfirmTitle: "アカウントを削除",
  editAccountDeleteConfirmMessage:
    "本当にアカウントを削除しますか？この操作は元に戻せません。",
  editAccountDeleteConfirmButton: "はい、アカウントを削除します",
  editAccountDeleteCancelButton: "キャンセル",
  editAccountDeleteSuccessMessage: "アカウントが正常に削除されました",
  editAccountDeleteErrorMessage: "アカウントの削除中にエラーが発生しました",

  createAccountTitle: "アカウントを作成",
  forgotPasswordTitle: "パスワードのリセット",
  forgotPasswordDescription:
    "メールアドレスを入力すると、パスワードリセットのリンクをお送りします。",
  forgotPasswordEmailLabel: "メール",
  forgotPasswordEmailPlaceholder: "メールを入力してください",
  forgotPasswordVerifyButton: "メールを確認",
  forgotPasswordSuccessMessage:
    "パスワードリセットリンクがメールに送信されました！",
  forgotPasswordErrorMessage: "予期しないエラーが発生しました。",
  forgotPasswordBackToLogin: "ログインページに戻る",

  loginTitle: "アカウントにログイン",
  loginEmailLabel: "メール",
  loginEmailPlaceholder: "メールを入力してください",
  loginPasswordLabel: "パスワード",
  loginPasswordPlaceholder: "パスワードを入力してください",
  loginRememberMe: "ログイン状態を保持する",
  loginForgotPassword: "パスワードを忘れた場合",
  loginButton: "ログイン",
  loginSuccessMessage: "ログインに成功しました",
  loginErrorMessage: "予期しないエラーが発生しました。",
  loginAccountArchived: "アカウントは非アクティブのためアーカイブされました。続行するには再アクティブ化してください。",
  loginOrLoginWith: "または、以下でログイン",
  loginGoogleButton: "Google",
  loginAppleButton: "Apple",
  loginNoAccount: "アカウントをお持ちでないですか？",
  loginCreateAccount: "アカウントを作成",

  resetPasswordTitle: "新しいパスワードを設定",
  resetPasswordDescription: "新しいパスワードを入力してください",
  resetPasswordLabel: "パスワード",
  resetPasswordPlaceholder: "新しいパスワードを入力してください",
  resetPasswordButton: "パスワードを設定",
  resetPasswordSuccessMessage: "パスワードが正常にリセットされました",
  resetPasswordErrorMessage: "予期しないエラーが発生しました。",
  resetPasswordBackToLogin: "ログインページに戻る",

  mapathonDetailsParticipantsFrom: "参加者数",
  mapathonDetailsParticipantsGoal: "目標参加者数",

  mapathonDetailsRanking: "評価による順位",
  mapathonDetailsDateRangeFrom: "開始日",
  mapathonDetailsDateRangeTo: "終了日",
  mapathonDetailsProgress: "{progress}%",
  mapathonsTitle: "マプソン",
  mapathonsActive: "アクティブ",
  mapathonsInactive: "非アクティブ",
  mapathonsFilterAll: "すべて",
  mapathonsFilter10Miles: "10マイル",
  mapathonsFilter20Miles: "20マイル",
  mapathonsFilter50Miles: "50マイル",
  mapathonsCreateButton: "+ マプソンを作成",
  mapathonsReviewsMade: "レビューが行われた",
  mapathonReviewsGoal: "目標レビュー数",
  mapathonsDateRangeFrom: "開始日",
  mapathonsDateRangeTo: "終了日",

  mapathonsLoadMore: "もっと読み込む",
  mapathonsLoading: "読み込み中...",
  mapathonsMyDrafts: "下書き",
  mapathonDraftBadge: "下書き",
  mapathonActionsTitle: "マパソンアクション",
  mapathonPublishButton: "マパソンを公開",
  mapathonPublishing: "公開中...",
  mapathonPublishSuccess: "マパソンが正常に公開されました！",
  mapathonPublishError: "マパソンの公開に失敗しました。もう一度お試しください。",
  mapathonDeleteButton: "マパソンを削除",
  mapathonDeleting: "削除中...",
  mapathonDeleteSuccess: "マパソンが正常に削除されました！",
  mapathonDeleteError: "マパソンの削除に失敗しました。もう一度お試しください。",
  mapathonDeleteConfirmTitle: "本当に削除しますか？",
  mapathonDeleteConfirmMessage: "この操作は元に戻せません。マパソンとすべてのデータが完全に削除されます。",
  mapathonDeleteConfirmButton: "はい、削除します",
  mapathonDeleteCancelButton: "キャンセル",
  mapathonDeleteDisabledTooltip: "このマパソンは参加者がいるため削除できません。",
  mapathonDeleteDisabledShort: "参加者あり",
  mapathonSaveAsDraft: "下書きとして保存",
  mapathonCreateAndPublish: "作成して公開",

  accountPageTitle: "マイアカウント",
  accountRankedLabel: "順位",
  accountReviewsLabel: "レビュー",
  accountParticipationLabel: "参加",
  accountDisabilitiesLabel: "障害",
  accountRaceLabel: "人種",
  accountAboutMeLabel: "自己紹介",
  accountDefaultAboutMe: "私はソフトウェアエンジニアです。",
  accountSignOutButton: "ログアウト",
  accountEditAccountButton: "アカウント編集",

  teamsPageTitle: "チーム",
  teamsCreateButton: "+ 新しいチームを作成",
  teamsRankLabel: "順位: ",
  teamsReviewsLabel: "レビュー :",
  teamsMembersLabel: "メンバー :",
  teamsLoadMoreButton: "もっと読み込む",
  teamsLoading: "チームを読み込み中…",
  teamsEmpty: "チームが見つかりません",
  teamsEmptyHint: "チームを作成して始めましょう！",

  homeNoRatingsMessage: "この場所にはレビューがありません",
  homeAddReviewButton: "レビューを追加",
  homeLoadMoreButton: "もっと読み込む",
  homePlacesNearYou: "近くの場所",
  homePlacesEmpty: "近くに場所が見つかりません",
  homePlacesEmptyHint: "場所を検索するか、マップを使って探索してみてください",

  authModalLoginTitle: "ログイン",
  authModalCreateAccountTitle: "アカウント作成",
  authModalForgotPasswordTitle: "パスワードを忘れた場合",
  authModalCloseButton: "閉じる",

  cardNoImageAvailable: "画像はありません",
  cardEntranceLabel: "入口",
  cardInteriorLabel: "内部",
  cardRestroomLabel: "トイレ",
  cardNoRatingsMessage: "この場所にはレビューがありません。",
  cardAddReviewButton: "レビューを追加",

  // Venue page translations
  venue: {
    placeImageAlt: "会場の画像",
    reviews: "レビュー",
    accessibilityScores: "アクセシビリティスコア",
    entrance: "入口",
    interior: "内部",
    restroom: "トイレ",
    address: "住所",
    phone: "電話",
    website: "ウェブサイト",
    hours: "営業時間",
    axsReviewsHeading: "AXS Map のレビュー ({{count}})",
    axsReviewsSubtext: "AXS Map ユーザーからのコミュニティによるアクセシビリティレビュー",
    googleReviewsHeading: "Google レビュー ({{count}})",
    googleReviewsSubtext: "Google ユーザーによる一般的なレビュー",
    googleAttribution: "Googleが提供するレビュー",
    providedNoComment: "ユーザーはテキストコメントなしでアクセシビリティ評価を提供しました。",
    noRatings: "この会場にはまだ評価がありません",
  },

  createAccountSuccessMessage:
    "アカウントが正常に作成されました。メールを確認してアカウントを有効にしてください。",
  createAccountErrorMessage: "アカウント作成中にエラーが発生しました。",
  stepOneFirstNameLabel: "名",
  stepOneFirstNamePlaceholder: "名を入力してください",
  stepOneLastNameLabel: "姓",
  stepOneLastNamePlaceholder: "姓を入力してください",
  stepOneEmailLabel: "メール",
  stepOneEmailPlaceholder: "メールを入力してください",
  stepOnePasswordLabel: "パスワード",
  stepOnePasswordPlaceholder: "パスワードを入力してください",
  stepOneNextButton: "次へ",
  stepOneAlreadyUserText: "既にユーザーですか？",
  stepOneSignInLink: "ログイン",
  stepTwoDisabilityLabel: "障害",
  stepTwoDisabilityPlaceholder: "障害について記入してください",
  stepTwoRaceLabel: "人種",
  stepTwoRacePlaceholder: "人種について記入してください",
  stepTwoBackButton: "戻る",
  stepTwoNextButton: "次へ",
  stepTwoAlreadyUserText: "既にユーザーですか？",
  stepTwoSignInLink: "ログイン",
  selectAnOption: "オプションを選択",
  yes: "はい",
  no: "いいえ",
  other: "その他",
  veryEasy: "とても簡単",
  easy: "簡単",
  notEasy: "簡単ではない",
  veryHard: "とても難しい",
  impossible: "不可能",

  // Review section titles - CORRECT MAPPING
  sectionEntrance: "入口",        // ENTRANCE (Step 1)
  sectionInterior: "内部",        // INTERIOR (Step 2)
  sectionRestroom: "トイレ",      // RESTROOM/BATHROOM (Step 3)
  sectionComment: "コメント",     // COMMENT (Step 4)

  // Review steps
  selectMapathon: "マパソンを選択",
  selectMapathonError: "最初にマパソンを選択するか、スキップボタンをクリックしてください",
  applyMapathonLabel: "このレビューをマパソンに適用する（任意）",
  doNotApplyMapathon: "マパソンに適用しない",
  skip: "スキップ",
  next: "次へ",
  comment: "コメント",
  generateComment: "コメントを生成",
  generating: "生成中...",
  commentPlaceholder: "コメント、アドバイス、ヒントなどを書いてください...",
  clearComment: "コメントをクリア",
  back: "戻る",
  submit: "送信",
  submitting: "送信中...",

  // Survey labels
  "survey.featuresLabel": "AXS Mapで最もよく使用する機能は何ですか？",
  "survey.navigationLabel": "アプリのナビゲーションのしやすさはどうですか？",
  "survey.satisfactionLabel": "アプリに満足していますか？",
  "survey.recommendLabel": "他の人に勧めますか？",

  stepThreeDescriptionLabel: "説明",
  stepThreeDescriptionPlaceholder: "自己紹介を記入してください",
  stepThreeNewsletterLabel: "AXSのニュースレターを受け取る",
  stepThreeBackButton: "戻る",
  stepThreeCreateAccountButton: "アカウント作成",
  stepThreeOrCreateWithText: "または、以下で作成",
  stepThreeGoogleButton: "Google",
  stepThreeAppleButton: "Apple",
  stepThreeAlreadyUserText: "既にユーザーですか？",
  stepThreeSignInLink: "ログイン",

  createMapathonTitle: "マプソンを作成",
  createMapathonNameLabel: "名前",
  createMapathonNamePlaceholder: "マプソンの名前",
  createMapathonDescriptionLabel: "マプソンの説明",
  createMapathonDescriptionPlaceholder: "短い説明を入力...",
  createMapathonLocationLabel: "場所",
  createMapathonLocationPlaceholder: "場所を入力してください",
  createMapathonMapLabel: "マプソンの場所のプレビュー",
  createMapathonMapHelperText: "上記に入力された住所に基づく場所のプレビュー",
  createMapathonDurationLabel: "期間",
  createMapathonParticipantsLabel: "参加者数",
  createMapathonParticipantsPlaceholder: "参加者数を入力してください",
  createMapathonReviewsLabel: "目標レビュー数",
  createMapathonReviewsPlaceholder: "レビュー数を入力してください",
  createMapathonIsOpenLabel: "このマプソンを公開する",
  createMapathonHostAsLabel: "ホスト名",
  createMapathonDonationEnabledLabel:
    "はい！このイベントをAXS Labへの寄付イベントにする",
  createMapathonDonationGoalLabel: "寄付目標",
  createMapathonDonationAmountLabel: "寄付額",
  createMapathonSubmitButton: "マプソンを作成",
  createMapathonSuccessMessage: "マプソンが正常に作成されました",
  createMapathonErrorMessage: "予期しないエラーが発生しました",
  createMapathonDraftSuccess: "マパソンが下書きとして保存されました",
  createMapathonSaveDraft: "下書きとして保存",
  createMapathonPublishButton: "作成して公開",

  createTeamTitle: "チームを作成",
  editTeamTitle: "チームを編集",
  createTeamNameLabel: "チーム名",
  createTeamNamePlaceholder: "チームの名前を入力",
  createTeamDescriptionLabel: "説明",
  createTeamDescriptionPlaceholder: "短い説明を入力...",
  createTeamAvatarLabel: "アバターを追加",
  createTeamAvatarFileTypeDescription:
    "ファイルサイズは5MB以下である必要があります。",
  createTeamSubmitButton: "チームを作成",
  editTeamSubmitButton: "チームを更新",
  createTeamCancelButton: "キャンセル",
  createTeamSuccessMessage: "チームが正常に作成されました",
  editTeamSuccessMessage: "チームが正常に更新されました",
  createTeamPhotoUploadSuccess: "写真が正常にアップロードされました",
  createTeamPhotoUploadError: "写真のアップロードに失敗しました",

  faqTitle: "FAQ",
  faqVideoTitle: "AXS Map：今日から参加しよう",
  faqHowToRateVenueTitle: "場所を評価する方法は？",
  faqHowToRateVenueDescription:
    "AXS Mapは直感的な評価プロセスを提供しますが、場所を評価する際に以下の点を考慮してください：",
  faqHowToRateVenueEntrance:
    "入口 – 入口に階段、スロープ、専用駐車場、別の入口、または広い入口がありますか？",
  faqHowToRateVenueInterior:
    "内部 – 内部に移動スペース、スロープ、アクセス可能なエレベーター、またはアクセス可能なテーブルがありますか？",
  faqHowToRateVenueRestroom:
    "トイレ – トイレのドアは外に開き、大きな個室、トイレ周りのサポート、または低い洗面台がありますか？",
  faqHowToRateVenueOther:
    "その他 – 場所はよく照らされており、騒音レベルが高い、または介助犬が許可されていますか？",
  faqAddPlaceTitle: "AXS Mapにない場所を追加できますか？",
  faqAddPlaceDescription:
    "いいえ、AXS MapはGoogle Placesのデータベースを使用して地図を埋めています。Google Placesは世界中のビジネスをカタログ化しています。場所がない場合は、Googleにリクエストを送ることをお勧めします。",
  faqNeighborhoodTitle:
    "私の近所や街には評価されていない場所が多くあります。どうすればいいですか？",
  faqNeighborhoodDescription:
    "私たちはコミュニティが集まって近所をマッピングすることを必要としています。AXS Mapでは、このための特別なツール「マプソン」を作成しました。ぜひチェックしてください！",
  faqReviewPlacesTitle: "自分が住んでいない場所を評価することはできますか？",
  faqReviewPlacesDescription:
    "もちろんです。もしあなたがその場所に行ったことがあり、良い思い出があれば、レビューを提供してください！",
  faqRegistrationTitle: "AXS Mapを使用するために登録する必要がありますか？",
  faqRegistrationDescription:
    "いいえ、AXS Mapを使うために登録する必要はありません。登録なしでも、AXS Mapのすべてのレビューを見ることができ、地図のすべてにアクセスできます。ただし、レビューを提供したい場合は、まず登録する必要があります。登録は無料で簡単です。また、AXS Mapに提供するすべての情報は匿名です。",
  faqFindPlaceTitle: "AXS Mapで評価したい場所を見つける方法は？",
  faqFindPlaceIntro: "AXS Mapには、場所を見つける方法がいくつかあります。",
  faqFindPlaceSearchBoxes:
    "AXS Mapのホームページでは、2つの検索ボックスがあります。左側のボックスに「Joe's Coffee」を入力し、右側のボックスに「Biloxi, Louisiana」と入力します。",
  faqFindPlaceSearchEverything:
    "別の方法として、左側の検索ボックスに「すべて」と入力し、右側に自分の場所の近くの住所を入力します。",
  faqFindPlaceGoogleDatabase:
    "これらの方法で場所が見つからない場合、その場所はGoogle Placesのデータベースに登録されていない可能性があります。",
  faqMapathonProcessTitle: "マプソン™のプロセスは？",
  faqMapathonAnimationPrompt:
    "マプソンのアニメーションを見ましたか？まだなら、こちらから確認できます。",
  faqMapathonVideoTitle: "AXS Map：今日から参加しよう",
  faqMapathonToolkitTitle: "マプソンツールキット",
  faqToolkitPaperFormsTitle: "レビュー用紙フォーム：",
  faqToolkitPaperFormsDescription:
    "これらのフォームは、参加者が紙でレビューを入力できるようにするものです。誰かの電話が使えない場合や参加者が電話を持っていない場合に役立ちます。",
  faqToolkitBrochureTitle: "企業向けパンフレット：",
  faqToolkitBrochureDescription:
    "マプソン参加者が近所を歩いているとき、ビジネスオーナーが「トイレを見せてください」と言われるのは少し驚くかもしれません。",
  faqToolkitHowToRateTitle: "評価方法：",
  faqToolkitHowToRateDescription:
    "レビューを提供するためのヒント – 参加者の中には、レビューの提供方法についてのアドバイスが必要な場合もあります。",
  faqMapathonStepsIntro: "典型的なマプソンのステップは以下の通りです：",
  faqMapathonSteps: [
    {
      title: "マプソンを計画する：",
      description: "土曜日または日曜日に4時間を予定することをお勧めします。",
    },
    {
      title: "参加者を招待する：",
      description: "できるだけ多くの人々をマプソンに招待してください。",
    },
    {
      title: "マプソンを開始する：",
      description: "一般的に、全員が1か所に集まって開始するのが最良です。",
    },
    {
      title: "チームに分ける：",
      description: "参加者をチームに分け、それぞれに特定の区域を担当させます。",
    },
    {
      title: "ツールと指示を提供する：",
      description:
        "参加者がAXS Mapアプリを使用できるようにし、使用方法を理解させます。",
    },
    {
      title: "レビューを開始する：",
      description: "チームは担当区域を訪れ、レビューを開始します。",
    },
    {
      title: "集まって経験を共有する：",
      description: "マプソン後に集まり、経験とフィードバックを共有します。",
    },
    {
      title: "レビューを提出する：",
      description:
        "すべてのレビューがAXS Mapプラットフォームに提出されたことを確認します。",
    },
    {
      title: "祝って参加者に感謝する：",
      description:
        "マプソンの成功を祝って、参加者全員に感謝の気持ちを伝えます。",
    },
  ],

  termsTitle: "利用規約",
  termsLastUpdated: "最終更新日：2021年5月19日。",
  termsIntro:
    "AXS Mapのウェブサイトとモバイルアプリを使用することにより、以下の利用規約に同意したことになります。よくお読みください。",
  termsDescription1:
    "これらの規約（「規約」）は、AXS Labのウェブサイトwww.axsmap.com（「サイト」）へのアクセスおよび使用に適用されます。サイトにアクセスまたは使用することにより、これらの規約に同意したことになり、AXS Lab Inc.（「AXS」）と法的に拘束力のある契約を結びます。AXS Lab Inc.は501(c)3の非営利団体です。規約に同意しない場合、サイトへのアクセスや使用はしないでください。",
  termsDescription2:
    "これらの規約は、あなたのサイトの使用に関する法的に拘束力のある条件を設定します。サイトにアクセスまたは使用することにより、これらの規約に同意し、これらの規約に従う権利、権限、能力があることを表明し保証します。規約に同意しない場合は、サイトへのアクセスおよび使用を行わないでください。",
  termsDefinitionsTitle: "1. 定義",
  termsDefinitionsPartiesTitle: "A. 当事者",
  termsDefinitionsPartiesDescription:
    "'あなた' と 'あなたの' はサイトの利用者を指します。'利用者' はサイトにアクセスしたり、ナビゲートしたり、何らかの方法でサイトを使用する人を指します。'私たち'、'私たちの'、および '私たちのもの' はAXSを指します。",
  termsDefinitionsContentTitle: "B. コンテンツ",
  termsDefinitionsContentDescription:
    "'コンテンツ' とは、テキスト、画像、写真、オーディオ、ビデオ、位置情報、その他のデータやコミュニケーション形式を指します。'あなたのコンテンツ' とは、サイトを通じてまたは関連して提出または送信するコンテンツを指します...",
  termsChangesTitle: "2. 利用規約の変更",
  termsChangesDescription:
    "私たちは時折、利用規約を変更することがあります。変更があった場合は、改訂版をこのページで通知します...",
  termsUsingSiteTitle: "3. サイトの使用",
  termsEligibilityTitle: "A. 利用資格",
  termsEligibilityDescription1:
    "サイトにアクセスまたは利用するには、13歳以上であり、これらの規約を承認する権限を持っている必要があります...",
  termsEligibilityDescription2:
    "もしあなたがAXSと法的な契約を結ぶ年齢に達していない場合は、サイトを利用することも規約を承諾することもできません...",
  termsUsersUnder18Title: "18歳未満の利用者",
  termsUsersUnder18Description1:
    "サイトは13歳未満の利用者を対象としていません。13歳未満の方はアカウントを作成することはできません...",
  termsUsersUnder18Description2:
    "18歳未満である場合、サイトを使用することにより、親または保護者の同意を得て行動することを宣言します...",
  termsUsersUnder18Description3:
    "もし親または保護者が、子供がアカウント作成時に年齢を偽ったことを私たちに通知した場合、そのアカウントを削除します...",
  termsPermissionTitle: "B. サイト使用許可",
  termsPermissionDescription:
    "これらの規約に従い、私たちはあなたに対して、サイトへのアクセスおよび利用のための個人的な、非独占的、譲渡不可、制限的かつ取り消し可能な権利を付与します...",
  termsSiteAvailabilityTitle: "C. サイトの利用可能性",
  termsSiteAvailabilityDescription:
    "サイトは、事前の通知なしに変更、更新、中断、停止される場合があります。",
  termsUserAccountsTitle: "D. ユーザーアカウント",
  termsUserAccountsDescription1:
    "アカウントを作成し、特定の機能を利用するために、あなたに関するいくつかの個人情報を提供することができます...",
  termsUserAccountsDescription2:
    "アカウントは個人的かつ非商業的な使用のみを目的としています。アカウント作成時に、正確かつ完全な情報の提供を求めます...",
  termsCommunicationsTitle: "E. AXSおよび他の利用者とのコミュニケーション",
  termsCommunicationsDescription:
    "アカウントを作成することで、サイトに関連する特定のコミュニケーションを受け取ることに同意したことになります...",
  termsContentTitle: "4. コンテンツ",
  termsResponsibilityTitle: "A. あなたのコンテンツの責任",
  termsResponsibilityDescription1:
    "あなたはあなたのコンテンツに対して唯一の責任を負い、一度公開された場合、それを撤回できないことがあります...",
  termsResponsibilityDescription2:
    "例えば、あなたのコンテンツが虚偽または意図的に誤解を招くものであった場合、責任を負うことになるかもしれません...",
  termsOurRightTitle: "B. 私たちの権利：あなたのコンテンツを使用する",
  termsOurRightDescription:
    "私たちは、あなたのコンテンツを様々な方法で使用することができます。具体的には、公開表示、フォーマットの変更など...",
  termsOwnershipTitle: "C. 所有権",
  termsOwnershipDescription:
    "あなたとAXSとの間で、あなたはあなたのコンテンツを所有します。AXSはAXSのコンテンツを所有します。これには、視覚インターフェースなどが含まれます...",
  termsAdvertisingTitle: "D. 広告",
  termsAdvertisingDescription:
    "AXSおよびそのライセンサーは、あなたのコンテンツに関連する広告を公開することができます...",
  termsMapathonsTitle: "E. マプソン",
  termsMapathonsDescription1:
    "あなたがマプソンのイベントに参加、作成、運営、または参加する場合...",
  termsMapathonsDescription2:
    "マプソンに参加する際のリスクはすべてあなたが負います。すべての参加者は慎重かつ良識を持って行動する必要があります...",
  termsMapathonsDescription3:
    "AXSおよびマプソンの主催者、AXSのディレクター、従業員に対して免責し、補償し、責任を免れることに同意します...",
  termsPersonalInfoTitle: "F. 個人情報",
  termsPersonalInfoDescription:
    "私たちは、サイト上およびサイトを通じて収集された個人情報を、サイトに記載されたプライバシーポリシーに従って取り扱います。",
  termsOtherTitle: "G. その他",
  termsOtherDescription:
    "ユーザーコンテンツは必ずしもAXSの意見を反映するものではありません。AXSはユーザーコンテンツを必ずしも審査するわけではありません...",
  termsRestrictionsTitle: "5. 制限事項",
  termsRestrictionsDescription:
    "私たちは、他の利用者に対して規約を強制する義務を負いません...",
  termsQuestionsTitle: "15. 質問",
  termsQuestionsDescription:
    "これらの規約に関する質問がある場合は、次のメールアドレスにご連絡ください: axsmap@axslab.org",

  footerCopyright: "AXS MAP",
  footerFAQ: "FAQ",
  footerShop: "ショップ",
  footerPrivacyPolicy: "プライバシーポリシー",
  footerTermsConditions: "利用規約",
  footerContact: "お問い合わせ",
  footerFacebookLink: "https://www.facebook.com/axsmap",
  footerTwitterLink: "https://twitter.com/axsmap",
  footerYouTubeLink: "https://www.youtube.com/axsmaptv",
  footerFacebookAlt: "facebook",
  footerTwitterAlt: "twitter",
  footerYouTubeAlt: "youtube",

  infoModalLogoAlt: "AXS Map ロゴ",
  infoModalBannerAlt: "AXS メインバナー",
  infoModalWelcomeTitle: "AXS Mapへようこそ、",
  infoModalWelcomeDescription:
    "これは、コミュニティの中でインクルージョンをマッピングし、より多くの人々に場所を提供する手助けをするために作られたツールです。",
  infoModalRatingSystemTitle: "評価システム",
  infoModalRatingSystemDescription:
    "私たちのアイコンシステムは、ユーザーが場所のアクセシビリティをどのように評価したかを一目で把握するためのものです。評価は3つの段階で示されます。",
  infoModalVenuePhasesTitle: "場所のフェーズ",
  infoModalEntranceAlt: "入口アイコン",
  infoModalEntranceLabel: "入口",
  infoModalInteriorAlt: "内部アイコン",
  infoModalInteriorLabel: "内部",
  infoModalRestroomAlt: "トイレアイコン",
  infoModalRestroomLabel: "トイレ",
  infoModalColorSystemTitle: "カラ―システム",
  infoModalAccessibleLabel: "アクセス可能",
  infoModalCautionLabel: "注意",
  infoModalAlertLabel: "警告",
  infoModalFullyAccessibleTitle: "完全にアクセス可能として評価",

  teamBannerAlt: "チームバナー",
  teamRankLabel: "ランキング",
  teamReviewsLabel: "レビュー",
  teamMapathonLabel: "マプソン",
  teamMapathonName: "La Vida Scholars Lynn AXS Mapathon",
  teamShareLabel: "シェア:",
  teamJoinButton: "+ チームに参加",
  teamEditButton: "チームを編集",
  teamJoinRequestSuccess: "チーム参加のリクエストが送信されました",
  teamAlreadyMember: "チームメンバー",

  headerLogoAlt: "AXS Map ロゴ",
  headerPlaces: "場所",
  headerMapathons: "マプソン",
  headerTeams: "チーム",
  headerDonate: "寄付",
  headerAboutUs: "私たちについて",
  headerSignIn: "サインイン",
  accountUserNameLabel: "ユーザー名",
  accountGenderLabel: "性別",
  searchPlaceholderLabel: "カテゴリと住所で検索（コーヒー、ニューヨーク",
  mapathonDetailsOrganizer: "主催者",
  mapathonDetailsParticipant: "参加者",

  mapathonDetailsOrganizerNotFound: "主催者が見つかりません",
  mapathonDetailsParticipantNotFound: "参加者が見つかりません",
  loginFacebookButton: "Facebook",

  headerMyAccount: "マイアカウント",
  headerUserAvatarAlt: "ユーザーアバター",
  ThankYouReviewClose: "閉じる",
  ThankYouReviewDetailsHeader: "ありがとう",
  ThankYouReviewDefaultPageTitle: "レビューありがとうございます | AXS Map",
  ThankYouReviewDetailsPageTitle: "より多くの場所、より多くの人々のために。",
  ThankYouReviewNotFoundPageTitle: "レビューが見つかりません | AXS Map",
  ThankYouReviewDetailsPageDescription:
    "AXS Mapコミュニティに貢献していただきありがとうございます。あなたの助けと知識により、私たちはより多くの経験を提供する世界に一歩近づきました - すべての人のための経験。",
  ThankYouReviewRatingsHeader: "評価された場所:",
  ThankYouReviewTextPlaceholder:
    "写真を追加するためにこの場所を評価してください",
  ThankYouReviewItemsPlaceholder: "アイテム",
  ThankYouReviewLocationsPlaceholder: "場所",

  copyright: "&copy; 2025 AXS MAP",
  faq: "FAQ",
  shop: "ショップ",
  privacyPolicy: "プライバシーポリシー",
  termsConditions: "利用規約",
  contact: "お問い合わせ",
  facebookAlt: "facebook",
  twitterAlt: "twitter",
  youtubeAlt: "youtube",

  title: "プライバシーポリシー",
  lastUpdated: "最終更新日: 2026年3月13日。",
  generalTitle: "I. 一般",
  generalDescription:
    "AXS Lab Inc.とその関連会社（総称して「私たち」または「AXS」）は、www.axsmap.com（「サイト」）を所有および運営し、あなたのプライバシーと個人情報の保護に取り組んでいます...",
  personalInfoTitle: "II. 収集する個人情報は何ですか？",
  registerTitle: "a) サイトに登録する時",
  registerDescription:
    "サイトに登録する際、次の個人情報を収集します。これらは他の情報と組み合わせることで、個人情報になることがあります：",
  registerList: [
    "名前",
    "メール",
    "パスワード",
    "住所",
    "ニュースレターの登録選択",
  ],
  registerNote:
    "上記の個人情報を提供する義務はありませんが、提供しない場合、サイトの一部の機能を利用できないことがあります。なお、ニュースレターなどの電子的なダイレクトマーケティングの受信を拒否する権利があります。当社から受け取るすべての電子的なダイレクトマーケティング（メールやSMSメッセージなど）には、今後これらのコミュニケーションの受信を停止するためのオプションが含まれています。当社からの電子的なダイレクトマーケティングについてご質問がある場合は、axsmap@axslab.org までご連絡ください。",
  communicateTitle: "b) 私たちとコミュニケーションする時",
  communicateDescription:
    "サイトを通じて私たちと連絡を取ったり、メールを送信したり、他の方法で連絡を取ったりする際に、次の個人情報を収集します：",
  communicateList: [
    "名前",
    "連絡先情報（メールアドレス、郵送先住所など）",
    "送信したコミュニケーションの内容",
  ],
  communicateNote:
    "上記の個人情報を提供する義務はありませんが、提供しない場合、お客様からのご連絡に回答できないことがあります。",
  requestInfoTitle: "c) 情報をリクエストする時",
  requestInfoDescription:
    "サイトの「お問い合わせ」機能を使用する際に、次の個人情報を収集します：",
  requestInfoList: [
    "名前",
    "連絡先情報（メールアドレスなど）",
    "送信したコミュニケーションの内容",
  ],
  requestInfoNote:
    "上記の個人情報を提供する義務はありませんが、提供しない場合、お客様からのご依頼にお応えできないことがあります。",
  surveysTitle: "d) アンケート、抽選、プロモーション",
  surveysDescription:
    "サイトでアンケート、抽選、その他のプロモーションに参加することがあります。参加する場合、次の個人情報を収集することがあります：",
  surveysList: [
    "名前",
    "連絡先情報（メールアドレス、郵送先住所、電話番号など）",
  ],
  surveysNote:
    "上記の個人情報を提供する義務はありませんが、提供しない場合、プロモーションに参加できないことがあります。",
  internetActivityTitle: "e) インターネット活動情報",
  internetActivityDescription:
    "サイトで使用されるソフトウェアは、インターネットまたは他の電子ネットワーク上での活動に関する情報を収集します。これらは単独または他の情報と組み合わせることで、個人情報になることがあります：",
  internetActivityList: [
    "サイトにアクセスするために使用したドメイン",
    "サイトにアクセスするために使用したブラウザの種類とオペレーティングシステム",
    "IPアドレス",
    "サイト訪問の日時（タイムスタンプ）",
    "サイトで閲覧されたページ",
    "サイトへのリンク元のウェブサイト",
    "サイト内での検索に使用された検索語句",
    "サイトで購入または閲覧された商品",
    "セッションID",
    "サイトに初めて訪れた場合",
  ],
  internetActivityGoogleAnalytics:
    "サイトで使用されるクッキーの詳細については、以下の第10節を参照してください。Google Analytics はサイトの要素の一つです。Google Analytics はクッキーを使用して、訪問時間、閲覧したページ、各ページで費やした時間、インターネット プロトコル アドレス、サイトにアクセスするために使用されたデバイスのオペレーティング システムの種類などのデータを収集および保存します。Google が提供する http://www.google.com/ads/preferences/plugin/ 上のブラウザ プラグインを使用することで、Google Analytics を無効にすることができます。",
  locationInfoTitle: "f) 位置情報（AXS Map モバイルアプリケーション）",
  locationInfoDescription:
    "AXS Map モバイルアプリケーションを使用する際、アプリは位置情報に基づくサービスを提供するために、お使いのデバイスの位置情報へのアクセス許可を求める場合があります。許可を与えた場合、アプリは GPS 座標を含む正確な位置情報にアクセスすることがあります。位置情報は、アプリの使用中および場合によってはバックグラウンド実行中にもアクセスされることがあります。位置データは、AXS Map サービスの機能（お客様の現在地に基づき、近くのアクセス可能な施設やイベントを特定して表示する機能など）を提供する目的のみに使用されます。位置情報サービスが有効な場合、アプリケーションが関連する近隣の場所を返せるように、デバイスの緯度・経度が当社のバックエンド システムに送信されることがあります。施設やイベントに関連する一部の位置情報（緯度、経度、場所の識別子など）は、当社のデータベースに保存される場合があります。また、Google マップなどのサードパーティ製地図サービスを使用して、アプリ内に地図や位置情報を表示することがあります。これらのサービスは、マッピング機能を提供するために必要な範囲で位置情報を処理する場合があります。当社は、位置データを広告目的で販売、貸与、または利用することはありません。お使いのデバイスの位置情報権限設定から、アプリが位置情報にアクセスできるかどうかをいつでも制御できます。",
  sourcesTitle: "III. 個人情報の情報源",
  sourcesDescription:
    "私たちは、以下のカテゴリの情報源から個人情報を収集します：",
  sourcesList: [
    "あなた：あなたが自発的に個人情報を提供した場合",
    "FacebookやGoogleなどの第三者のアイデンティティ管理サービス",
    "ソフトウェア：クッキー、ウェブログ、ウェブビーコンなどの分析ツールを通じて自動的に収集される情報",
  ],
  purposesTitle: "IV. なぜ私たちはあなたの個人情報を収集するのか",
  purposesDescription: "私たちは、以下の目的であなたの個人情報を使用します：",
  purposesList: [
    "サイトの運営および改善（サイトの利用状況を分析することで、サイトがどのように利用されているかを理解するため）",
    "サイト上でマプソンを開催する機能を提供すること",
    "あなたがリクエストしたすべての情報を提供すること",
    "サイトの変更についてお知らせすること",
    "必要に応じて、サイトに関連するアクションや行政的対応を行うこと",
    "同意したマーケティングメッセージを送信すること",
    "詐欺や違法な活動から保護し、識別し、予防すること",
    "適用される法規制、業界基準、および自社の方針に従うこと",
    "私たちが提供する他の商品やサービスに関する情報を提供すること",
  ],

  discloseTitle: "V. 私たちが個人情報を開示する方法",
  discloseDescription:
    "私たちは、以下のカテゴリの個人情報を、商業的な目的で以下のカテゴリの第三者に開示することがあります：",
  discloseTableHeaders: {
    categoryOfInfo: "個人情報のカテゴリ",
    categoryOfThirdParty: "第三者のカテゴリ",
  },
  discloseTableRows: [
    {
      personalInfo: ["識別情報", "インターネット活動情報", "職業関連情報"],
      thirdParty: ["私たちの関連会社（所有する子会社など）"],
    },
    {
      personalInfo: ["識別情報", "職業関連情報", "インターネット活動情報"],
      thirdParty: [
        "サービスプロバイダー：ホスティングやサイト管理を行う企業、データストレージや分析企業など。これらのサービスプロバイダーは、これらのサービス提供のためにのみ個人情報を使用できます。",
      ],
    },
    {
      personalInfo: ["識別情報", "職業関連情報", "インターネット活動情報"],
      thirdParty: [
        "企業取引や手続きの関係者：売却、合併、再編、倒産、解散、または同様のイベントが発生した場合、個人情報は資産の一部として移転されることがあります。",
      ],
    },
    {
      personalInfo: ["識別情報", "職業関連情報"],
      thirdParty: [
        "公的機関や法的手続き：AXSは、法的要求に従って政府機関や司法機関、または第三者に対して個人情報を開示することがあります。",
      ],
    },
  ],

  californiaRightsTitle: "VI. カリフォルニア州のプライバシー権",
  californiaRightsIntro:
    "カリフォルニア州民法第1798.83条は、カリフォルニアに住むユーザーに対して、私たちが第三者に個人情報をマーケティング目的で開示したかどうかに関する情報をリクエストする権利を与えます。リクエストを行う場合は、以下のメールアドレスにご連絡ください",
  californiaRightsEmail: "axsmap@axslab.org",

  dataRetentionTitle: "VII. データの保存",
  dataRetentionDescription:
    "私たちは、収集された個人情報を収集目的を達成するために必要な期間のみ保存します...",
  linksTitle: "VIII. 他のウェブサイトへのリンク",
  linksDescription:
    "サイトには他の興味深いウェブサイトへのリンクが含まれている場合があります。しかし、これらのリンクを使用してサイトを離れると、私たちはその第三者のウェブサイトを制御することができません。これらのウェブサイトで提供された個人情報の保護やプライバシーについては責任を負いません。これらのサイトはこのプライバシーポリシーの対象ではありません。そのサイトに適用されるプライバシーポリシーを確認するために慎重に行動してください。",

  childrenTitle: "IX. 子供",
  childrenDescription:
    "サイトおよびサービスは16歳未満の子供を対象としていません。そのため、16歳未満の方から個人情報を収集する意図はありません。私たちは、16歳未満の個人の情報を収集、販売、または意図的に処理することはありません。",

  cookiesTitle: "X. クッキーの使用方法",
  cookiesDescription:
    "サイトのいくつかの機能には、'クッキー'（デバイスのハードドライブに保存される小さなテキストファイル）の使用が必要です。私たちは、ページの閲覧数や最も頻繁に使用される機能を測定するためにクッキーを使用します。これにより、サイトを継続的に改善し、訪問者のニーズに対応することができます。",
  cookiesIntro:
    "以下では、クッキーの異なるカテゴリをどのように使用するか、またクッキー設定を管理するためのオプションについて説明します。",
  cookiesTableHeaders: {
    type: "クッキーの種類",
    description: "説明",
    managingSettings: "設定の管理",
  },
  cookiesTableRows: [
    {
      type: "必須クッキー",
      description:
        "必須クッキーは、サイトをナビゲートしてその機能を使用するために必要です。たとえば、サイトの安全なエリアにアクセスしたり、サービスを利用したりするために使用されます。私たちに識別されるように選択した場合、これらのクッキーには暗号化された情報が含まれ、サイトにログインしているときに一意に識別できるようにします。これにより、オンラインでの取引やリクエストの処理が可能になります。",
      managingSettings:
        "必須クッキーはサイトの動作に必要不可欠なため、これらのクッキーを無効にするオプションはありません。",
    },
    {
      type: "パフォーマンスクッキー",
      description:
        "これらのクッキーは、サイトの使用方法に関する情報を収集します。頻繁にアクセスされるページや、特定のページでエラーメッセージが表示されたかどうかなどです。これらのクッキーは、あなたを個別に識別する情報を収集することはありません。情報はサイトの機能とパフォーマンスを改善するためにのみ使用されます。場合によっては、サイトを訪問する個人に関する利用状況およびボリューム統計情報を追跡・分析するために、第三者に委託することがあります。また、これらの目的のために Flash クッキーを使用する場合もあります。",
      managingSettings:
        "パフォーマンスクッキーを無効にする方法については、ブラウザの設定で確認してください。Flashクッキーのプライバシーとストレージ設定を管理する方法についてはこちらをご覧ください。",
    },
    {
      type: "機能性クッキー",
      description:
        "機能性クッキーは、サイトが入力した情報や選択（ユーザー名、言語、地域など）を記憶し、より充実したパーソナライズされた機能を提供するために使用されます。これらのクッキーは、ログイン後にサイトの利用を最適化するためにも使用されます。また、テキストのサイズ、フォント、その他カスタマイズ可能なウェブページの部分に対して行った変更を記憶するためにも使用できます。ローカル共有オブジェクト（Flash クッキーとも呼ばれます）を使用して、お客様の設定を保存したり、サイトで閲覧した内容に基づいてコンテンツを表示して訪問をパーソナライズしたりする場合があります。",
      managingSettings:
        "機能性クッキーを無効にする方法については、ブラウザの設定で確認してください。Flashクッキーのプライバシーとストレージ設定を管理する方法についてはこちらをご覧ください。",
    },
  ],

  securityTitle: "XII. セキュリティ",
  securityDescription:
    "私たちは、個人情報の損失、不正使用、不正アクセス、開示、変更、または破壊から保護するために、処理に伴うリスクおよび個人情報の性質を考慮した、合理的かつ適切な措置を講じています。当社がサイト上およびサイトを通じて収集した個人情報を、一般に公開されていない安全な運用環境に保存するよう努めていますが、送信中または当社のシステム上での保存中の個人情報の完全な保護を保証することはできません。さらに、個人情報の完全性とセキュリティの確保に努めていますが、当社のセキュリティ対策が、いわゆるハッカーなどの第三者が個人情報に不正にアクセスすることを防ぐことを保証するものではありません。お客様の個人情報が第三者による損失、不正使用、または改ざんから保護されることを保証または表明するものではありません。",

  changesTitle: "XIII. この通知の変更",
  changesDescription:
    "このプライバシーポリシーは、時折変更されることがあります。変更が行われた場合、プライバシーポリシーの更新版の日付を確認することで、最後に更新された日を知ることができます。変更があった場合は、定期的にサイトを確認し、プライバシーポリシーの変更を確認してください。",

  dntTitle: "XIV. Do Not Track（DNT）設定",
  dntDescription:
    "カリフォルニア州の法律により、WebブラウザのDo Not Track（DNT）信号にどのように対応するかをお知らせする義務があります。現在、業界標準や法的基準がないため、私たちは現時点ではDNT信号には対応していません。",

  PrivacyPolicyContactUsTitle: "XV. お問い合わせ",
  contactUsDescription:
    "このプライバシーポリシーや、私たちのプライバシーやデータセキュリティの実践について質問や懸念がある場合は、以下の方法でご連絡ください：",
  contactUsEmail: "axsmap@axslab.org",

  donationTitle: "もっと多くの人々のために扉を開こう",
  description:
    "寄付をすることで、AXS Labが得意とすること、つまり人々をつなげ、すべての人のための世界を作り出す手助けができます。寄付は、すべての人のアクセシビリティの自由を拡大し、実際の人々に—何百万人もの人々に—非常に具体的な方法で役立つことを意味します。",
  donateOnce: "一回限りの寄付",
  donateMonthly: "月々の寄付",
  chooseAmount: "寄付する金額を選択",
  amounts: {
    25: "25 $",
    50: "50 $",
    100: "100 $",
    other: "その他の金額",
  },
  donateButton: "寄付する",
  DonorAboutTitle: "創設者ジェイソン・ダシルヴァについて知ろう",
  DonorAboutDescription:
    "25歳で進行性の多発性硬化症と診断された映画製作者ジェイソン・ダシルヴァは、アートとストーリーテリングに目を向け、歩行器から車椅子へと移行する過程を描いた映画『When I Walk』でエミー賞を受賞しました。現在、ジェイソンは映画監督、プロデューサー、作家、障害者の権利活動家であり、AXS Labの創設者です。彼の目標は、物語やツール、アートを通じて、もっと多くの経験と自由を含む世界を広げることです。",
  viewFilmsButton: "ジェイソンのすべての映画を見る",
  socialLinks: {
    facebook: "https://www.facebook.com/axsmap",
    twitter: "https://twitter.com/axsmap",
    youtube: "https://www.youtube.com/user/AXSMapTV",
  },

  // Stats Bar
  statsRegisteredUsers: "登録ユーザー",
  statsMapathonsCities: "主要都市でのマプソン",
  statsCountries: "世界中の国々",
};
export default jp;
