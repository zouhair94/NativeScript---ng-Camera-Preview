"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { android } from 'tns-core-modules/application/application';
//import{ CameraService } from "../shared/camera/camera.service";
var application_1 = require("application");
var platformModule = require("platform");
var page_1 = require("ui/page");
var CampervComponent = /** @class */ (function (_super) {
    __extends(CampervComponent, _super);
    function CampervComponent(page) {
        var _this = _super.call(this) || this;
        _this.page = page;
        _this.init = false;
        //the textureView implementation
        _this.onCreatingView = function (args) {
            if (application_1.android) {
                var appContext = application_1.android.context;
                _this.mtextureview = new android.view.TextureView(application_1.android.context);
                _this.mtextureview.setSurfaceTextureListener(_this.msurfaceTextureLisitiner);
                args.view = _this.mtextureview;
            }
            if (application_1.ios) {
                console.log("running on ios");
            }
        };
        //the method surfaceTextureListiner callback from the interface
        _this.msurfaceTextureLisitiner = new android.view.TextureView.SurfaceTextureListener({
            onSurfaceTextureAvailable: function (texture, width, height) {
                console.log('texture avlaible');
                _this.mcamera = android.hardware.Camera.open(1);
                var params = _this.mcamera.getParameters();
                _this.mcamera.setDisplayOrientation(90);
                params.set("orientation", "portrait");
                _this.mcamera.setParameters(params);
                _this.mtextureview = texture;
                try {
                    _this.mcamera.setPreviewTexture(texture);
                    _this.mcamera.startPreview();
                }
                catch (e) {
                    console.log(e);
                }
            },
            onSurfaceTextureSizeChanged: function (texture, width, height) {
                console.log('size changed');
            },
            onSurfaceTextureDestroyed: function (texture) {
                console.log('surface destroyed');
                _this.mcamera.stopPreview();
                _this.mcamera.release();
                return true;
            },
            onSurfaceTextureUpdated: function (texture) {
                console.log("texture updated");
            }
        });
        _this.onSurfaceTextureDestroyed = function (texture) {
            console.log('surface destroyed2');
            _this.mcamera.stopPreview();
            _this.mcamera.release();
            return true;
        };
        _this.onLoaded = function (args) {
            _this.page = args.object;
        };
        _this.height = platformModule.screen.mainScreen.heightPixels;
        _this.width = platformModule.screen.mainScreen.widthPixels;
        console.log("page width is: " + _this.width + " page height is : " + _this.height);
        return _this;
    }
    CampervComponent.prototype.onSurfaceTextureAvailable = function (texture, width, height) {
        console.log('texture avlaible2');
        this.mcamera = android.hardware.Camera.open();
        //this.mtextureview = texture;
        try {
            this.mcamera.setPreviewTexture(texture);
            this.mcamera.startPreview();
        }
        catch (e) {
            console.log(e);
        }
    };
    CampervComponent.prototype.onSurfaceTextureSizeChanged = function (texture, width, height) {
        console.log('size changed2');
    };
    CampervComponent.prototype.onSurfaceTextureUpdated = function (texture) {
        console.log("texture updated2");
    };
    CampervComponent.prototype.ngOnInit = function () {
        this.init = true;
        console.log("height is " + this.height);
    };
    CampervComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-camperv',
            templateUrl: './camperv.component.html',
            styleUrls: ['./camperv.component.scss']
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], CampervComponent);
    return CampervComponent;
}(java.lang.Object));
exports.CampervComponent = CampervComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtcGVydi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYW1wZXJ2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCxxRUFBcUU7QUFDckUsaUVBQWlFO0FBQ2pFLDJDQUFrRTtBQUdsRSx5Q0FBNEM7QUFDNUMsZ0NBQStCO0FBUS9CO0lBQXNDLG9DQUFnQjtJQVFwRCwwQkFBb0IsSUFBUztRQUE3QixZQUNHLGlCQUFPLFNBSVQ7UUFMbUIsVUFBSSxHQUFKLElBQUksQ0FBSztRQU50QixVQUFJLEdBQVksS0FBSyxDQUFDO1FBWTdCLGdDQUFnQztRQUN6QixvQkFBYyxHQUFHLFVBQUMsSUFBUTtZQUMzQixFQUFFLENBQUEsQ0FBQyxxQkFBVSxDQUFDLENBQUEsQ0FBQztnQkFDYixJQUFJLFVBQVUsR0FBRyxxQkFBVSxDQUFDLE9BQU8sQ0FBRTtnQkFDckMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JFLEtBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsS0FBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQzNFLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBRTtZQUVqQyxDQUFDO1lBQUEsRUFBRSxDQUFBLENBQUMsaUJBQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCwrREFBK0Q7UUFDeEQsOEJBQXdCLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQztZQUNwRix5QkFBeUIsRUFBRyxVQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTTtnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxNQUFNLEdBQXNDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQzdFLEtBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN0QyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7Z0JBQzVCLElBQUcsQ0FBQztvQkFDQSxLQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4QyxLQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNoQyxDQUFDO2dCQUFBLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsQ0FBQztZQUVILENBQUM7WUFDRCwyQkFBMkIsRUFBRyxVQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTTtnQkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBQ0QseUJBQXlCLEVBQUcsVUFBQyxPQUFPO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDakIsQ0FBQztZQUNELHVCQUF1QixFQUFHLFVBQUMsT0FBTztnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7U0FDRixDQUFDLENBQUM7UUFnQkQsK0JBQXlCLEdBQUcsVUFBQyxPQUFPO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNCLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNqQixDQUFDLENBQUE7UUFJSCxjQUFRLEdBQUUsVUFBQyxJQUFJO1lBQ1osS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLENBQUMsQ0FBQTtRQXpFRSxLQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUM1RCxLQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFDLEtBQUksQ0FBQyxLQUFLLEdBQUMsb0JBQW9CLEdBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUM5RSxDQUFDO0lBNENELG9EQUF5QixHQUF6QixVQUEwQixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU07UUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUMsOEJBQThCO1FBQzlCLElBQUcsQ0FBQztZQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsQ0FBQztJQUVILENBQUM7SUFDRCxzREFBMkIsR0FBM0IsVUFBNEIsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQU9ELGtEQUF1QixHQUF2QixVQUF3QixPQUFPO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBSUgsbUNBQVEsR0FBUjtRQUNHLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUF2RlUsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN4QyxDQUFDO3lDQVN5QixXQUFJO09BUmxCLGdCQUFnQixDQXlGNUI7SUFBRCx1QkFBQztDQUFBLEFBekZELENBQXNDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQXlGckQ7QUF6RlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy9pbXBvcnQgeyBhbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbic7XG4vL2ltcG9ydHsgQ2FtZXJhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY2FtZXJhL2NhbWVyYS5zZXJ2aWNlXCI7XG5pbXBvcnQge2FuZHJvaWQgYXMgYW5kcm9pZEFwcCAsIGlvcyBhcyBpb3NBcHB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHBsYWNlaG9sZGVyID0gcmVxdWlyZShcInVpL3BsYWNlaG9sZGVyXCIpO1xuaW1wb3J0IHBsYWNlaG9sZGVyTW9kdWxlID0gcmVxdWlyZShcInVpL3BsYWNlaG9sZGVyXCIpO1xuaW1wb3J0IHBsYXRmb3JtTW9kdWxlID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1jYW1wZXJ2JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbXBlcnYuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYW1wZXJ2LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FtcGVydkNvbXBvbmVudCBleHRlbmRzIGphdmEubGFuZy5PYmplY3QgaW1wbGVtZW50cyBPbkluaXQgLCBhbmRyb2lkLnZpZXcuVGV4dHVyZVZpZXcuU3VyZmFjZVRleHR1cmVMaXN0ZW5lciB7XG4gIHB1YmxpYyBhcmdzOiBwbGFjZWhvbGRlci5DcmVhdGVWaWV3RXZlbnREYXRhO1xuICBwdWJsaWMgaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgbXRleHR1cmV2aWV3OmFueTtcbiAgcHVibGljIG91dHB1dDtcbiAgcHVibGljIGhlaWdodDphbnk7XG4gIHB1YmxpYyB3aWR0aDphbnk7XG4gIHB1YmxpYyBtY2FtZXJhOmFuZHJvaWQuaGFyZHdhcmUuQ2FtZXJhO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6UGFnZSl7XG4gICAgIHN1cGVyKCk7XG4gICAgIHRoaXMuaGVpZ2h0ID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0UGl4ZWxzO1xuICAgICB0aGlzLndpZHRoID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhQaXhlbHM7XG4gICAgIGNvbnNvbGUubG9nKFwicGFnZSB3aWR0aCBpczogXCIrdGhpcy53aWR0aCtcIiBwYWdlIGhlaWdodCBpcyA6IFwiK3RoaXMuaGVpZ2h0KTtcbiAgfVxuICAvL3RoZSB0ZXh0dXJlVmlldyBpbXBsZW1lbnRhdGlvblxuICBwdWJsaWMgb25DcmVhdGluZ1ZpZXcgPSAoYXJnczphbnkpPT57XG4gICAgICAgIGlmKGFuZHJvaWRBcHApe1xuICAgICAgICAgIHZhciBhcHBDb250ZXh0ID0gYW5kcm9pZEFwcC5jb250ZXh0IDtcbiAgICAgICAgICB0aGlzLm10ZXh0dXJldmlldyA9IG5ldyBhbmRyb2lkLnZpZXcuVGV4dHVyZVZpZXcoYW5kcm9pZEFwcC5jb250ZXh0KTtcbiAgICAgICAgICB0aGlzLm10ZXh0dXJldmlldy5zZXRTdXJmYWNlVGV4dHVyZUxpc3RlbmVyKHRoaXMubXN1cmZhY2VUZXh0dXJlTGlzaXRpbmVyKTtcbiAgICAgICAgICBhcmdzLnZpZXcgPSB0aGlzLm10ZXh0dXJldmlldyA7XG5cbiAgICAgICAgfWlmKGlvc0FwcCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJydW5uaW5nIG9uIGlvc1wiKTtcbiAgICAgICAgfVxuICB9XG4gIC8vdGhlIG1ldGhvZCBzdXJmYWNlVGV4dHVyZUxpc3RpbmVyIGNhbGxiYWNrIGZyb20gdGhlIGludGVyZmFjZVxuICBwdWJsaWMgbXN1cmZhY2VUZXh0dXJlTGlzaXRpbmVyID0gbmV3IGFuZHJvaWQudmlldy5UZXh0dXJlVmlldy5TdXJmYWNlVGV4dHVyZUxpc3RlbmVyKHtcbiAgICBvblN1cmZhY2VUZXh0dXJlQXZhaWxhYmxlIDogKHRleHR1cmUsd2lkdGgsaGVpZ2h0KT0+e1xuICAgICAgY29uc29sZS5sb2coJ3RleHR1cmUgYXZsYWlibGUnKTtcbiAgICAgIHRoaXMubWNhbWVyYSA9IGFuZHJvaWQuaGFyZHdhcmUuQ2FtZXJhLm9wZW4oMSk7XG4gICAgICB2YXIgcGFyYW1zOmFuZHJvaWQuaGFyZHdhcmUuQ2FtZXJhLlBhcmFtZXRlcnMgPSB0aGlzLm1jYW1lcmEuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgdGhpcy5tY2FtZXJhLnNldERpc3BsYXlPcmllbnRhdGlvbig5MCk7XG4gICAgICBwYXJhbXMuc2V0KFwib3JpZW50YXRpb25cIiwgXCJwb3J0cmFpdFwiKTtcbiAgICAgIHRoaXMubWNhbWVyYS5zZXRQYXJhbWV0ZXJzKHBhcmFtcyk7IFxuICAgICAgdGhpcy5tdGV4dHVyZXZpZXcgPSB0ZXh0dXJlO1xuICAgICAgdHJ5e1xuICAgICAgICAgIHRoaXMubWNhbWVyYS5zZXRQcmV2aWV3VGV4dHVyZSh0ZXh0dXJlKTtcbiAgICAgICAgICB0aGlzLm1jYW1lcmEuc3RhcnRQcmV2aWV3KCk7XG4gICAgICB9Y2F0Y2goZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuXG4gICAgfSxcbiAgICBvblN1cmZhY2VUZXh0dXJlU2l6ZUNoYW5nZWQgOiAodGV4dHVyZSx3aWR0aCxoZWlnaHQpPT57XG4gICAgICBjb25zb2xlLmxvZygnc2l6ZSBjaGFuZ2VkJyk7XG4gICAgfSxcbiAgICBvblN1cmZhY2VUZXh0dXJlRGVzdHJveWVkIDogKHRleHR1cmUpPT57XG4gICAgICAgICBjb25zb2xlLmxvZygnc3VyZmFjZSBkZXN0cm95ZWQnKTtcbiAgICAgICAgIHRoaXMubWNhbWVyYS5zdG9wUHJldmlldygpO1xuICAgICAgICAgdGhpcy5tY2FtZXJhLnJlbGVhc2UoKTtcbiAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgb25TdXJmYWNlVGV4dHVyZVVwZGF0ZWQgOiAodGV4dHVyZSk9PntcbiAgICAgIGNvbnNvbGUubG9nKFwidGV4dHVyZSB1cGRhdGVkXCIpO1xuICAgIH1cbiAgfSk7XG4gIG9uU3VyZmFjZVRleHR1cmVBdmFpbGFibGUodGV4dHVyZSx3aWR0aCxoZWlnaHQpe1xuICAgICAgY29uc29sZS5sb2coJ3RleHR1cmUgYXZsYWlibGUyJyk7XG4gICAgICB0aGlzLm1jYW1lcmEgPSBhbmRyb2lkLmhhcmR3YXJlLkNhbWVyYS5vcGVuKCk7IFxuICAgICAgLy90aGlzLm10ZXh0dXJldmlldyA9IHRleHR1cmU7XG4gICAgICB0cnl7XG4gICAgICAgICAgdGhpcy5tY2FtZXJhLnNldFByZXZpZXdUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgICAgIHRoaXMubWNhbWVyYS5zdGFydFByZXZpZXcoKTtcbiAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG5cbiAgICB9XG4gICAgb25TdXJmYWNlVGV4dHVyZVNpemVDaGFuZ2VkKHRleHR1cmUsd2lkdGgsaGVpZ2h0KXtcbiAgICAgIGNvbnNvbGUubG9nKCdzaXplIGNoYW5nZWQyJyk7XG4gICAgfVxuICAgIG9uU3VyZmFjZVRleHR1cmVEZXN0cm95ZWQgPSAodGV4dHVyZSk9PntcbiAgICAgICAgIGNvbnNvbGUubG9nKCdzdXJmYWNlIGRlc3Ryb3llZDInKTtcbiAgICAgICAgIHRoaXMubWNhbWVyYS5zdG9wUHJldmlldygpO1xuICAgICAgICAgdGhpcy5tY2FtZXJhLnJlbGVhc2UoKTtcbiAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBvblN1cmZhY2VUZXh0dXJlVXBkYXRlZCh0ZXh0dXJlKXtcbiAgICAgIGNvbnNvbGUubG9nKFwidGV4dHVyZSB1cGRhdGVkMlwiKTtcbiAgICB9XG4gIG9uTG9hZGVkID0oYXJncyk9PntcbiAgICAgdGhpcy5wYWdlID0gYXJncy5vYmplY3Q7XG4gIH1cbiAgbmdPbkluaXQoKXtcbiAgICAgdGhpcy5pbml0PXRydWU7XG4gICAgIGNvbnNvbGUubG9nKFwiaGVpZ2h0IGlzIFwiK3RoaXMuaGVpZ2h0KTtcbiAgfVxuIFxufSJdfQ==