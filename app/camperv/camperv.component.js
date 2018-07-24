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
        _this.cid = 1;
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
                _this.mcamera = android.hardware.Camera.open(_this.cid);
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
    CampervComponent.prototype.cameraId = function () {
        if (this.cid == 1) {
            this.mcamera.stopPreview();
            this.mcamera.release();
            this.cid = 0;
            this.mcamera = android.hardware.Camera.open(this.cid);
            var params = this.mcamera.getParameters();
            this.mcamera.setDisplayOrientation(90);
            params.set("orientation", "portrait");
            this.mcamera.setParameters(params);
            this.mcamera.setPreviewTexture(this.mtextureview);
            this.mcamera.startPreview();
        }
        else if (this.cid == 0) {
            this.cid = 1;
            this.mcamera.stopPreview();
            this.mcamera.release();
            this.mcamera = android.hardware.Camera.open(this.cid);
            var params = this.mcamera.getParameters();
            this.mcamera.setDisplayOrientation(90);
            params.set("orientation", "portrait");
            this.mcamera.setParameters(params);
            this.mcamera.setPreviewTexture(this.mtextureview);
            this.mcamera.startPreview();
        }
        console.log(this.cid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtcGVydi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYW1wZXJ2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCxxRUFBcUU7QUFDckUsaUVBQWlFO0FBQ2pFLDJDQUFrRTtBQUdsRSx5Q0FBNEM7QUFDNUMsZ0NBQStCO0FBUS9CO0lBQXNDLG9DQUFnQjtJQVNwRCwwQkFBb0IsSUFBUztRQUE3QixZQUNHLGlCQUFPLFNBSVQ7UUFMbUIsVUFBSSxHQUFKLElBQUksQ0FBSztRQVB0QixVQUFJLEdBQVksS0FBSyxDQUFDO1FBR3RCLFNBQUcsR0FBRyxDQUFDLENBQUM7UUFVZixnQ0FBZ0M7UUFDekIsb0JBQWMsR0FBRyxVQUFDLElBQVE7WUFDM0IsRUFBRSxDQUFBLENBQUMscUJBQVUsQ0FBQyxDQUFBLENBQUM7Z0JBQ2IsSUFBSSxVQUFVLEdBQUcscUJBQVUsQ0FBQyxPQUFPLENBQUU7Z0JBQ3JDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyRSxLQUFJLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUU7WUFFakMsQ0FBQztZQUFBLEVBQUUsQ0FBQSxDQUFDLGlCQUFNLENBQUMsQ0FBQSxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBQ0QsK0RBQStEO1FBQ3hELDhCQUF3QixHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7WUFDcEYseUJBQXlCLEVBQUcsVUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1B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VyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN4QyxDQUFDO3lDQVV5QixXQUFJO09BVGxCLGdCQUFnQixDQW9INUI7SUFBRCx1QkFBQztDQUFBLEFBcEhELENBQXNDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQW9IckQ7QUFwSFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy9pbXBvcnQgeyBhbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbic7XG4vL2ltcG9ydHsgQ2FtZXJhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY2FtZXJhL2NhbWVyYS5zZXJ2aWNlXCI7XG5pbXBvcnQge2FuZHJvaWQgYXMgYW5kcm9pZEFwcCAsIGlvcyBhcyBpb3NBcHB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHBsYWNlaG9sZGVyID0gcmVxdWlyZShcInVpL3BsYWNlaG9sZGVyXCIpO1xuaW1wb3J0IHBsYWNlaG9sZGVyTW9kdWxlID0gcmVxdWlyZShcInVpL3BsYWNlaG9sZGVyXCIpO1xuaW1wb3J0IHBsYXRmb3JtTW9kdWxlID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1jYW1wZXJ2JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbXBlcnYuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYW1wZXJ2LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FtcGVydkNvbXBvbmVudCBleHRlbmRzIGphdmEubGFuZy5PYmplY3QgaW1wbGVtZW50cyBPbkluaXQgLCBhbmRyb2lkLnZpZXcuVGV4dHVyZVZpZXcuU3VyZmFjZVRleHR1cmVMaXN0ZW5lciB7XG4gIHB1YmxpYyBhcmdzOiBwbGFjZWhvbGRlci5DcmVhdGVWaWV3RXZlbnREYXRhO1xuICBwdWJsaWMgaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgbXRleHR1cmV2aWV3OmFueTtcbiAgcHVibGljIG91dHB1dDtcbiAgcHVibGljIGNpZCA9IDE7XG4gIHB1YmxpYyBoZWlnaHQ6YW55O1xuICBwdWJsaWMgd2lkdGg6YW55O1xuICBwdWJsaWMgbWNhbWVyYTphbmRyb2lkLmhhcmR3YXJlLkNhbWVyYTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOlBhZ2Upe1xuICAgICBzdXBlcigpO1xuICAgICB0aGlzLmhlaWdodCA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscztcbiAgICAgdGhpcy53aWR0aCA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLndpZHRoUGl4ZWxzO1xuICAgICBjb25zb2xlLmxvZyhcInBhZ2Ugd2lkdGggaXM6IFwiK3RoaXMud2lkdGgrXCIgcGFnZSBoZWlnaHQgaXMgOiBcIit0aGlzLmhlaWdodCk7XG4gIH1cbiAgLy90aGUgdGV4dHVyZVZpZXcgaW1wbGVtZW50YXRpb25cbiAgcHVibGljIG9uQ3JlYXRpbmdWaWV3ID0gKGFyZ3M6YW55KT0+e1xuICAgICAgICBpZihhbmRyb2lkQXBwKXtcbiAgICAgICAgICB2YXIgYXBwQ29udGV4dCA9IGFuZHJvaWRBcHAuY29udGV4dCA7XG4gICAgICAgICAgdGhpcy5tdGV4dHVyZXZpZXcgPSBuZXcgYW5kcm9pZC52aWV3LlRleHR1cmVWaWV3KGFuZHJvaWRBcHAuY29udGV4dCk7XG4gICAgICAgICAgdGhpcy5tdGV4dHVyZXZpZXcuc2V0U3VyZmFjZVRleHR1cmVMaXN0ZW5lcih0aGlzLm1zdXJmYWNlVGV4dHVyZUxpc2l0aW5lcik7XG4gICAgICAgICAgYXJncy52aWV3ID0gdGhpcy5tdGV4dHVyZXZpZXcgO1xuXG4gICAgICAgIH1pZihpb3NBcHApe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwicnVubmluZyBvbiBpb3NcIik7XG4gICAgICAgIH1cbiAgfVxuICAvL3RoZSBtZXRob2Qgc3VyZmFjZVRleHR1cmVMaXN0aW5lciBjYWxsYmFjayBmcm9tIHRoZSBpbnRlcmZhY2VcbiAgcHVibGljIG1zdXJmYWNlVGV4dHVyZUxpc2l0aW5lciA9IG5ldyBhbmRyb2lkLnZpZXcuVGV4dHVyZVZpZXcuU3VyZmFjZVRleHR1cmVMaXN0ZW5lcih7XG4gICAgb25TdXJmYWNlVGV4dHVyZUF2YWlsYWJsZSA6ICh0ZXh0dXJlLHdpZHRoLGhlaWdodCk9PntcbiAgICAgIGNvbnNvbGUubG9nKCd0ZXh0dXJlIGF2bGFpYmxlJyk7XG4gICAgICB0aGlzLm1jYW1lcmEgPSBhbmRyb2lkLmhhcmR3YXJlLkNhbWVyYS5vcGVuKHRoaXMuY2lkKTtcbiAgICAgIHZhciBwYXJhbXM6YW5kcm9pZC5oYXJkd2FyZS5DYW1lcmEuUGFyYW1ldGVycyA9IHRoaXMubWNhbWVyYS5nZXRQYXJhbWV0ZXJzKCk7XG4gICAgICB0aGlzLm1jYW1lcmEuc2V0RGlzcGxheU9yaWVudGF0aW9uKDkwKTtcbiAgICAgIHBhcmFtcy5zZXQoXCJvcmllbnRhdGlvblwiLCBcInBvcnRyYWl0XCIpO1xuICAgICAgdGhpcy5tY2FtZXJhLnNldFBhcmFtZXRlcnMocGFyYW1zKTsgXG4gICAgICB0aGlzLm10ZXh0dXJldmlldyA9IHRleHR1cmU7XG4gICAgICB0cnl7XG4gICAgICAgICAgdGhpcy5tY2FtZXJhLnNldFByZXZpZXdUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgICAgIHRoaXMubWNhbWVyYS5zdGFydFByZXZpZXcoKTtcbiAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG5cbiAgICB9LFxuICAgIG9uU3VyZmFjZVRleHR1cmVTaXplQ2hhbmdlZCA6ICh0ZXh0dXJlLHdpZHRoLGhlaWdodCk9PntcbiAgICAgIGNvbnNvbGUubG9nKCdzaXplIGNoYW5nZWQnKTtcbiAgICB9LFxuICAgIG9uU3VyZmFjZVRleHR1cmVEZXN0cm95ZWQgOiAodGV4dHVyZSk9PntcbiAgICAgICAgIGNvbnNvbGUubG9nKCdzdXJmYWNlIGRlc3Ryb3llZCcpO1xuICAgICAgICAgdGhpcy5tY2FtZXJhLnN0b3BQcmV2aWV3KCk7XG4gICAgICAgICB0aGlzLm1jYW1lcmEucmVsZWFzZSgpO1xuICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBvblN1cmZhY2VUZXh0dXJlVXBkYXRlZCA6ICh0ZXh0dXJlKT0+e1xuICAgICAgY29uc29sZS5sb2coXCJ0ZXh0dXJlIHVwZGF0ZWRcIik7XG4gICAgfVxuICB9KTtcbiAgb25TdXJmYWNlVGV4dHVyZUF2YWlsYWJsZSh0ZXh0dXJlLHdpZHRoLGhlaWdodCl7XG4gICAgICBjb25zb2xlLmxvZygndGV4dHVyZSBhdmxhaWJsZTInKTtcbiAgICAgIHRoaXMubWNhbWVyYSA9IGFuZHJvaWQuaGFyZHdhcmUuQ2FtZXJhLm9wZW4oKTsgXG4gICAgICAvL3RoaXMubXRleHR1cmV2aWV3ID0gdGV4dHVyZTtcbiAgICAgIHRyeXtcbiAgICAgICAgICB0aGlzLm1jYW1lcmEuc2V0UHJldmlld1RleHR1cmUodGV4dHVyZSk7XG4gICAgICAgICAgdGhpcy5tY2FtZXJhLnN0YXJ0UHJldmlldygpO1xuICAgICAgfWNhdGNoKGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICBvblN1cmZhY2VUZXh0dXJlU2l6ZUNoYW5nZWQodGV4dHVyZSx3aWR0aCxoZWlnaHQpe1xuICAgICAgY29uc29sZS5sb2coJ3NpemUgY2hhbmdlZDInKTtcbiAgICB9XG4gICAgb25TdXJmYWNlVGV4dHVyZURlc3Ryb3llZCA9ICh0ZXh0dXJlKT0+e1xuICAgICAgICAgY29uc29sZS5sb2coJ3N1cmZhY2UgZGVzdHJveWVkMicpO1xuICAgICAgICAgdGhpcy5tY2FtZXJhLnN0b3BQcmV2aWV3KCk7XG4gICAgICAgICB0aGlzLm1jYW1lcmEucmVsZWFzZSgpO1xuICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9uU3VyZmFjZVRleHR1cmVVcGRhdGVkKHRleHR1cmUpe1xuICAgICAgY29uc29sZS5sb2coXCJ0ZXh0dXJlIHVwZGF0ZWQyXCIpO1xuICAgIH1cbiAgb25Mb2FkZWQgPShhcmdzKT0+e1xuICAgICB0aGlzLnBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgfVxuICBwdWJsaWMgY2FtZXJhSWQoKXtcbiAgICBpZih0aGlzLmNpZCA9PTEpe1xuICAgICAgdGhpcy5tY2FtZXJhLnN0b3BQcmV2aWV3KCk7XG4gICAgICB0aGlzLm1jYW1lcmEucmVsZWFzZSgpO1xuICAgICAgXG4gICAgICB0aGlzLmNpZD0wO1xuICAgICAgdGhpcy5tY2FtZXJhID0gYW5kcm9pZC5oYXJkd2FyZS5DYW1lcmEub3Blbih0aGlzLmNpZCk7XG4gICAgICB2YXIgcGFyYW1zOmFuZHJvaWQuaGFyZHdhcmUuQ2FtZXJhLlBhcmFtZXRlcnMgPSB0aGlzLm1jYW1lcmEuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgdGhpcy5tY2FtZXJhLnNldERpc3BsYXlPcmllbnRhdGlvbig5MCk7XG4gICAgICBwYXJhbXMuc2V0KFwib3JpZW50YXRpb25cIiwgXCJwb3J0cmFpdFwiKTtcbiAgICAgIHRoaXMubWNhbWVyYS5zZXRQYXJhbWV0ZXJzKHBhcmFtcyk7IFxuICAgICAgdGhpcy5tY2FtZXJhLnNldFByZXZpZXdUZXh0dXJlKHRoaXMubXRleHR1cmV2aWV3KTtcbiAgICAgIHRoaXMubWNhbWVyYS5zdGFydFByZXZpZXcoKTtcbiAgICAgIFxuICAgIH1lbHNlIGlmKHRoaXMuY2lkPT0wKXt0aGlzLmNpZD0xO1xuICAgIHRoaXMubWNhbWVyYS5zdG9wUHJldmlldygpO1xuICAgICAgdGhpcy5tY2FtZXJhLnJlbGVhc2UoKTtcbiAgICB0aGlzLm1jYW1lcmEgPSBhbmRyb2lkLmhhcmR3YXJlLkNhbWVyYS5vcGVuKHRoaXMuY2lkKTtcbiAgICB2YXIgcGFyYW1zOmFuZHJvaWQuaGFyZHdhcmUuQ2FtZXJhLlBhcmFtZXRlcnMgPSB0aGlzLm1jYW1lcmEuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgdGhpcy5tY2FtZXJhLnNldERpc3BsYXlPcmllbnRhdGlvbig5MCk7XG4gICAgICBwYXJhbXMuc2V0KFwib3JpZW50YXRpb25cIiwgXCJwb3J0cmFpdFwiKTtcbiAgICAgIHRoaXMubWNhbWVyYS5zZXRQYXJhbWV0ZXJzKHBhcmFtcyk7IFxuICAgICAgdGhpcy5tY2FtZXJhLnNldFByZXZpZXdUZXh0dXJlKHRoaXMubXRleHR1cmV2aWV3KTtcbiAgICAgIHRoaXMubWNhbWVyYS5zdGFydFByZXZpZXcoKTt9XG4gICAgY29uc29sZS5sb2codGhpcy5jaWQpO1xuICB9XG4gIG5nT25Jbml0KCl7XG4gICAgIHRoaXMuaW5pdD10cnVlO1xuICAgICBjb25zb2xlLmxvZyhcImhlaWdodCBpcyBcIit0aGlzLmhlaWdodCk7XG4gIH1cbiBcbn0iXX0=