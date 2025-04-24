import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { StackHeader } from '@/Components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/Theme/Variables'
import { useRoute } from '@react-navigation/native'
import Step1 from '@/Components/CreateReview/Step1'
import Step2 from '@/Components/CreateReview/Step2'
import Step3 from '@/Components/CreateReview/Step3'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { ScreenWidth } from '@/Helpers'
import { createReviewValuesInterface } from '@/Components/CreateReview/interface'
import { useCreateReviewMutation } from '@/Services/modules/mapathon'
import { navigate } from '@/Navigators/utils'
const progressWidth = ScreenWidth * 0.8

const titles = {
  1: 'EXTERIOR',
  2: 'INTERIOR',
  3: 'COMMENT',
}

const CreateReview = () => {
  const { bottom } = useSafeAreaInsets()
  const params: any = useRoute().params
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1)
  const progress = useSharedValue(progressWidth / 3)
  const [createReview, { isLoading: loading }] = useCreateReviewMutation()

  const valuesRef = useRef<createReviewValuesInterface>({
    step1: {
      steps: null,
      has1Step: null,
      has2Step: null,
      hasWideEntrance: null,
      hasParking: null,
      hasSecondEntry:null,
      hasPermanentRamp:null,
    },
    step2: {
      multipleFloors: null,
      hasAccessibleElevator: null,
      hasWellLit: null,
      brightLightTitle: null,
      hasWashroom: null,
      hasSupportAroundToilet: null,
      hasLoweredSinks:null,
    },
    step3: {
      comment: '',
    },
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value - progressWidth }],
    }
  })

  const nextStep = useCallback(() => {
    if (activeStep <= 3) {
      setActiveStep((activeStep + 1) as 1 | 2 | 3)
      progress.value = withSpring(progressWidth / 3 + progress.value)
    }
  }, [activeStep])

  const preStep = useCallback(() => {
    if (activeStep !== 1) {
      setActiveStep((activeStep - 1) as 1 | 2 | 3)
      progress.value = withSpring(progress.value - progressWidth / 3)
    }
  }, [activeStep])

  const onPressSubmit = useCallback(
    async (comment:string) => {
      const placeId = params?.placeId
      try {
        const reviewData = {
          ...valuesRef.current.step1,
          ...valuesRef.current.step2,
          comment: comment,
          place: placeId,
        }

        const res = await createReview(reviewData as any).unwrap()
        navigate('ReviewThankYou',{
          userReviewFieldsAmount: res?.userReviewFieldsAmount,
          userReviewsAmount: res?.userReviewsAmount,
          venue: res?.venue,
        })
      } catch (error) {
        console.log(error)
      }
    },
    [params],
  )

  return (
    <View style={[styles.root, { paddingBottom: bottom + 20 }]}>
      <StackHeader title={params?.name} />
      <View style={styles.review_container}>
        <Text onPress={preStep} style={styles.title}>
          {titles[activeStep]}
        </Text>
        {/* <Text onPress={nextStep} style={styles.title}>
          EXTERIOR
        </Text> */}
        <View style={styles.progress_wrapper}>
          <Animated.View style={[styles.progress, rStyle]} />
        </View>
        {activeStep === 1 ? (
          <Step1 initialValues={valuesRef} nextStep={nextStep} />
        ) : activeStep === 2 ? (
          <Step2
            initialValues={valuesRef}
            preStep={preStep}
            nextStep={nextStep}
          />
        ) : (
          <Step3
            initialValues={valuesRef}
            preStep={preStep}
            submit={onPressSubmit}
            loading={loading}
          />
        )}
      </View>
    </View>
  )
}

export default CreateReview

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.whiteCode01,
  },
  review_container: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.secondary,
  },
  progress_wrapper: {
    width: progressWidth,
    height: 10,
    backgroundColor: Colors.gray300,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: 10,
    backgroundColor: Colors.primary,
    width: progressWidth,
    borderRadius: 10,
  },
})
