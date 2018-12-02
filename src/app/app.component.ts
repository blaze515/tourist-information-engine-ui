import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material/typings/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'mass-transit-ui';
  private baseUrl = 'http://localhost:8080/';
  private startURL = this.baseUrl + '/start/';
  private processEventURL = this.baseUrl + '/processEvent/';
  private rewindEventURL = this.baseUrl + '/rewind';
  private resetURL = this.baseUrl + '/reset';
  private configFile;
  private parameterFile;
  private configFileInput;
  private resetCount: any;
  public started;
  public dataSource: any;
  public lastEvent: string;
  public myTable;
  public displayedColumns = ['stopid', 'stopName', 'passengersAtStop', 'busid', 'passengersOnBus', 'passengerCapacity', 'routeid', 'speed'];
  public canUpdate: boolean;
  public canRewind: boolean;
  public configSelected: boolean;
  public paramsSelected: boolean;

  // @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource([{}]);
    this.started = false;
    this.lastEvent = '';
    this.canUpdate = false;
    this.canRewind = false;
    this.configSelected = false;
    this.paramsSelected = false;
    this.resetCount = 0;
  }

  startSim(e) {
    const formData = new FormData();
    formData.append('configList', this.configFile);
    formData.append('configList', this.parameterFile);

    const result = this.http.post(this.startURL, formData);
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
          this.resetCount = this.resetCount - 1;
        }
      );
    }
    console.log()
    if (this.resetCount === 0){
      this.canRewind = false;
    }
  }

  reset(e) {
    window.location.reload();
  }


}
