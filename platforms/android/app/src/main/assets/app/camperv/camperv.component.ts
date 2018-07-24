import { Component, OnInit } from '@angular/core';

//import { android } from 'tns-core-modules/application/application';
//import{ CameraService } from "../shared/camera/camera.service";
import {android as androidApp , ios as iosApp} from "application";
import placeholder = require("ui/placeholder");
import placeholderModule = require("ui/placeholder");
import platformModule = require("platform");
import { Page } from "ui/page";

@Component({
  moduleId: module.id,
  selector: 'app-camperv',
  templateUrl: './camperv.component.html',
  styleUrls: ['./camperv.component.scss']
})
export class CampervComponent extends java.lang.Object implements OnInit , android.view.TextureView.SurfaceTextureListener {
  public args: placeholder.CreateViewEventData;
  public init: boolean = false;
  public mtextureview:any;
  public output;
  public cid = 1;
  public height:any;
  public width:any;
  public mcamera:android.hardware.Camera;
  constructor(private page:Page){
     super();
     this.height = platformModule.screen.mainScreen.heightPixels;
     this.width = platformModule.screen.mainScreen.widthPixels;
     console.log("page width is: "+this.width+" page height is : "+this.height);
  }
  //the textureView implementation
  public onCreatingView = (args:any)=>{
        if(androidApp){
          var appContext = androidApp.context ;
          this.mtextureview = new android.view.TextureView(androidApp.context);
          this.mtextureview.setSurfaceTextureListener(this.msurfaceTextureLisitiner);
          args.view = this.mtextureview ;

        }if(iosApp){
          console.log("running on ios");
        }
  }
  //the method surfaceTextureListiner callback from the interface
  public msurfaceTextureLisitiner = new android.view.TextureView.SurfaceTextureListener({
    onSurfaceTextureAvailable : (texture,width,height)=>{
      console.log('texture avlaible');
      this.mcamera = android.hardware.Camera.open(this.cid);
      var params:android.hardware.Camera.Parameters = this.mcamera.getParameters();
      this.mcamera.setDisplayOrientation(90);
      params.set("orientation", "portrait");
      this.mcamera.setParameters(params); 
      this.mtextureview = texture;
      try{
          this.mcamera.setPreviewTexture(texture);
          this.mcamera.startPreview();
      }catch(e){
        console.log(e);
      }

    },
    onSurfaceTextureSizeChanged : (texture,width,height)=>{
      console.log('size changed');
    },
    onSurfaceTextureDestroyed : (texture)=>{
         console.log('surface destroyed');
         this.mcamera.stopPreview();
         this.mcamera.release();
         return true;
    },
    onSurfaceTextureUpdated : (texture)=>{
      console.log("texture updated");
    }
  });
  onSurfaceTextureAvailable(texture,width,height){
      console.log('texture avlaible2');
      this.mcamera = android.hardware.Camera.open(); 
      //this.mtextureview = texture;
      try{
          this.mcamera.setPreviewTexture(texture);
          this.mcamera.startPreview();
      }catch(e){
        console.log(e);
      }

    }
    onSurfaceTextureSizeChanged(texture,width,height){
      console.log('size changed2');
    }
    onSurfaceTextureDestroyed = (texture)=>{
         console.log('surface destroyed2');
         this.mcamera.stopPreview();
         this.mcamera.release();
         return true;
    }
    onSurfaceTextureUpdated(texture){
      console.log("texture updated2");
    }
  onLoaded =(args)=>{
     this.page = args.object;
  }
  public cameraId(){
    if(this.cid ==1){
      this.mcamera.stopPreview();
      this.mcamera.release();
      
      this.cid=0;
      this.mcamera = android.hardware.Camera.open(this.cid);
      var params:android.hardware.Camera.Parameters = this.mcamera.getParameters();
      this.mcamera.setDisplayOrientation(90);
      params.set("orientation", "portrait");
      this.mcamera.setParameters(params); 
      this.mcamera.setPreviewTexture(this.mtextureview);
      this.mcamera.startPreview();
      
    }else if(this.cid==0){this.cid=1;
    this.mcamera.stopPreview();
      this.mcamera.release();
    this.mcamera = android.hardware.Camera.open(this.cid);
    var params:android.hardware.Camera.Parameters = this.mcamera.getParameters();
      this.mcamera.setDisplayOrientation(90);
      params.set("orientation", "portrait");
      this.mcamera.setParameters(params); 
      this.mcamera.setPreviewTexture(this.mtextureview);
      this.mcamera.startPreview();}
    console.log(this.cid);
  }
  ngOnInit(){
     this.init=true;
     console.log("height is "+this.height);
  }
 
}