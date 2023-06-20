### Hello Everyone, 

I'm Sumit Kumar, I am here to introduce 

https://www.sumitkmr.com/dynamic-schema/

This is a single web page tool that I have designed, this will help you generate JSON schema for dynamic components extension without any python or PC. This is a very easy tool that generate schema in 3 seconds!

## How to use

It works same as the normal python schema generator by Yusuf Cihan.

* Create a design in your AIA and export it.

  ![image|690x293](https://kodular-community.s3.dualstack.eu-west-1.amazonaws.com/original/3X/4/8/4881d43d1b67ae7d0177850bf6493b7ea5d62abb.png)

  **Note:** Do not include any extra component in your design, it may affect the schema.

* Upload to the generator and enter the screen name.

  ![image|391x299](https://kodular-community.s3.dualstack.eu-west-1.amazonaws.com/original/3X/9/a/9aed562afbefd47da3a69856f52e999232667510.png)

* Click on Generate button and your schema will be generated instantly.

  ![image|609x500](https://kodular-community.s3.dualstack.eu-west-1.amazonaws.com/optimized/3X/f/e/fe246be80e32dcb4d419acefa49c14eb2848c3ad_2_609x500.png)

#### Generated Schema

Select it and copy it, then you can use it with the dynamic component!

```
{
  "name": "Generated Templated",
  "metadata-version": 1,
  "extension_version": 5,
  "author": "Sumit Kumar",
  "platforms": [
    "App Inventor",
    "Kodular",
    "Niotron"
  ],
  "extensions": {
    "DevYBImageLoader": "com.devyb.devybimageloader.DevYBImageLoader",
    "DynamicComponents": "com.yusufcihan.DynamicComponents.DynamicComponents"
  },
  "keys": [
    "id",
    "name",
    "text"
  ],
  "components": [
    {
      "id": "Card_View1{id}",
      "type": "MakeroidCardView",
      "properties": {
        "ContentPaddingLeft": 15,
        "CornerRadius": 5,
        "Elevation": 5,
        "Width": -2
      },
      "components": [
        {
          "id": "Horizontal_Arrangement1{id}",
          "type": "HorizontalArrangement",
          "properties": {
            "AlignVertical": 2,
            "Width": -2
          },
          "components": [
            {
              "id": "icon{id}",
              "type": "Image",
              "properties": {
                "Height": 40,
                "Width": 40,
                "Picture": "profile.png",
                "ScalePictureToFit": true
              }
            },
            {
              "id": "Space1{id}",
              "type": "SpaceView",
              "properties": {
                "Width": 10
              }
            },
            {
              "id": "name{id}",
              "type": "Label",
              "properties": {
                "Text": "{name}"
              }
            },
            {
              "id": "Space2{id}",
              "type": "SpaceView",
              "properties": {
                "Width": -2
              }
            },
            {
              "id": "button{id}",
              "type": "Button",
              "properties": {
                "Text": "{text}"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

![image|617x229](https://kodular-community.s3.dualstack.eu-west-1.amazonaws.com/original/3X/a/2/a2ab795687e8b9fc78875da834ce5b066ab73791.png)

![Screenshot_2023-06-19-16-07-39-490_io.makeroid.companion|344x300](https://kodular-community.s3.dualstack.eu-west-1.amazonaws.com/optimized/3X/4/b/4b9fb1bbd08e01ed833f8292b4a3690dfb2bbbb9_2_344x300.png)


## Feedback

You can report the issues and can share your thought on it!

[Telegram](https://t.me/sumit1334) | [Contact Me](sumitkmr.com)

Thank You

Sumit Kumar
