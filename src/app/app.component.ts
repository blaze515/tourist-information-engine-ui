import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {NgForm} from '@angular/forms';
import {AppDialogModalComponent} from './app-dialog-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mass-transit-ui';
  private baseUrl = 'http://localhost:8080/';
  private startURL = this.baseUrl + 'start/\{kspd\}/\{kcap\}/\{kwait\}/\{kbus\}/\{kcomb\}?kspd=';
  private processEventURL = this.baseUrl + 'processEvent/';
  private rewindEventURL = this.baseUrl + 'rewind/';
  private resetURL = this.baseUrl + 'reset/';
  private updateBusURL = this.baseUrl + 'updateBus/\{busId\}/\{routeId\}/\{speed\}/\{capacity\}?busId=';
  private configFile;
  private parameterFile;
  private configFileInput;
  private resetCount: any;
  public started;
  public dataSource: any;
  public lastEvent: string;
  public efficiency: string;
  public myTable;
  public displayedColumns = ['stopid', 'stopName', 'passengersAtStop', 'busid', 'passengersOnBus', 'passengerCapacity', 'routeid', 'speed'];
  public canUpdate: boolean;
  public canRewind: boolean;
  public configSelected: boolean;
  public paramsSelected: boolean;
  public bid: any;
  public rid: any;
  public spd: any;
  public cap: any;
  public updateResult: any;
  kspd: any;
  kcap: any;
  kwait: any;
  kbus: any;
  kcomb: any;
  private hasKvalues: boolean;

  // @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([{}]);
    this.started = false;
    this.lastEvent = '';
    this.canUpdate = false;
    this.canRewind = false;
    this.configSelected = false;
    this.paramsSelected = false;
    this.resetCount = 0;
    this.kspd = 1;
    this.kcap = 1;
    this.kwait = 1;
    this.kbus = 1;
    this.kcomb = 1;
  }

  startSim(e) {
    const url = `${this.startURL + this.kspd}&kcap=${this.kcap}&kwait=${this.kwait}&kbus=${this.kbus}&kcomb=${this.kcomb}`;
    console.log(url);

    const formData = new FormData();
    formData.append('configList', this.configFile);
    formData.append('configList', this.parameterFile);

    const result = this.http.post(url, formData);
    result.subscribe(
      json => {
        console.log(json);
        this.dataSource = new MatTableDataSource(json['stateList']);
      }
    );
    this.started = true;
  }

  uploadConfigFile(e) {
    this.configFile = e.target.files[0];
    this.configSelected = true;
  }

  uploadParameterFile(e) {
    this.parameterFile = e.target.files[0];
    this.paramsSelected = true;
  }

  processEvent(e) {
    this.http.get(this.processEventURL).subscribe(
      json => {
        console.log(json);
        this.dataSource = new MatTableDataSource(json['stateList']);
        this.lastEvent = json['lastEventString'];
        this.efficiency = json['systemEfficiency'];
        this.canUpdate = true;
        this.canRewind = true;
        if (this.resetCount < 3) {
          this.resetCount = this.resetCount + 1;
          console.log(this.resetCount);
        }
      }
    );
  }

  rewindLastEvent(e) {
    console.log(this.resetCount);
    if (this.resetCount > 0) {
      this.http.get(this.rewindEventURL).subscribe(
        json => {
          console.log(json);
          this.dataSource = new MatTableDataSource(json['stateList']);
          this.lastEvent = json['lastEventString'];
          this.efficiency = json['systemEfficiency'];
          this.resetCount = this.resetCount - 1;
        }
      );
    }
    console.log();
    if (this.resetCount === 0) {
      this.canRewind = false;
    }
  }

  reset(e) {
    window.location.reload();
  }


  updateBus(busUpdateForm: NgForm) {
    const url = `${this.updateBusURL + this.bid}&routeId=${this.rid}&speed=${this.spd}&capacity=${this.cap}`;

    this.http.get(url).subscribe(
        resp => {
          if (resp) {
            this.updateResult = 'The operation was successful, and the bus will be updated.';
            // console.log('Failed');
          } else {
            this.updateResult = 'The operation failed. Make sure that the bus and route IDs are valid.';
            // console.log('Succeeded');
          }

          const dialogRef = this.dialog.open(AppDialogModalComponent, {
            width: '250px',
            data: {updateResult: this.updateResult}
          });


          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        });
  }

  kValues() {
    this.hasKvalues = true;
  }
}

