# AWS Deployment

## Steps

1. Go to the S3 page. <br/> ![step-1](images/step-1.png)
2. Select the axsmap-app bucket. <br/> ![step-2](images/step-2.png)
3. Choose all the files inside of it and delete them. <br/> ![step-3](images/step-3.png)
4. After deleting the files, choose to upload new ones. <br/> ![step-4](images/step-4.png)
5. Select all the files generated inside the build folder on the root path. <br/> ![step-5](images/step-5.png)
6. In the second step (Set permissions) select **Grant public read access to this object(s)**. <br/> ![step-6](images/step-6.png)
7. Click Next for the following steps until you end up in the final step. Then click Upload. <br/> ![step-7](images/step-7.png)
8. After uploading the new files, go to CloudFront in other to invalidate the old files in the CDN. <br/> ![step-8](images/step-8.png)
9. Click on the ID link. <br/> ![step-9](images/step-9.png)
10. Go the Invalidations tab and select one of the options and finally click on Invalidate. <br/> ![step-10](images/step-10.png)
