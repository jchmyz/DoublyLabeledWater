"use strict";
// all actually numbers and dates, but passed as strings via the json
Object.defineProperty(exports, "__esModule", { value: true });
var Timing;
(function (Timing) {
    Timing["INITIAL"] = "initial";
    Timing["FINAL"] = "final";
})(Timing = exports.Timing || (exports.Timing = {}));
exports.EXPECTED_CSV_FIELDS = [
    'd_meas_1', 'd_meas_2', 'd_meas_3', 'd_meas_4', 'd_meas_5',
    'o_meas_1', 'o_meas_2', 'o_meas_3', 'o_meas_4', 'o_meas_5',
    'sample_times_1', 'sample_times_2', 'sample_times_3', 'sample_times_4', 'sample_times_5', 'sample_times_6',
    'dose_weight_d', 'dose_weight_o',
    'dose_enrichment_d', 'dose_enrichment_o',
    'subject_weight_initial', 'subject_weight_final',
    'subject_id'
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzL0NhbGN1bGF0aW9uSW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxRUFBcUU7O0FBY3JFLElBQVksTUFHWDtBQUhELFdBQVksTUFBTTtJQUNkLDZCQUFtQixDQUFBO0lBQ25CLHlCQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhXLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQUdqQjtBQUVZLFFBQUEsbUJBQW1CLEdBQUc7SUFDL0IsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVU7SUFDMUQsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVU7SUFDMUQsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO0lBQzFHLGVBQWUsRUFBRSxlQUFlO0lBQ2hDLG1CQUFtQixFQUFFLG1CQUFtQjtJQUN4Qyx3QkFBd0IsRUFBRSxzQkFBc0I7SUFDaEQsWUFBWTtDQUNmLENBQUMiLCJmaWxlIjoidHlwZXMvQ2FsY3VsYXRpb25JbnB1dHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbGwgYWN0dWFsbHkgbnVtYmVycyBhbmQgZGF0ZXMsIGJ1dCBwYXNzZWQgYXMgc3RyaW5ncyB2aWEgdGhlIGpzb25cblxuZXhwb3J0IGludGVyZmFjZSBDYWxjdWxhdGlvbklucHV0cyB7XG4gICAgZF9tZWFzOiBzdHJpbmdbXSxcbiAgICBvMThfbWVhczogc3RyaW5nW10sXG4gICAgZGF0ZXRpbWVzOiBudW1iZXJbXVtdLFxuICAgIGRvc2Vfd2VpZ2h0czogc3RyaW5nW10sXG4gICAgZG9zZV9lbnJpY2htZW50czogc3RyaW5nW10sXG4gICAgc3ViamVjdF93ZWlnaHRzOiBzdHJpbmdbXSxcbiAgICBzdWJqZWN0X2lkOiBzdHJpbmcsXG4gICAgbWl4ZWRfZG9zZTogYm9vbGVhbixcbiAgICBpbl9wZXJtaWw6IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBlbnVtIFRpbWluZyB7XG4gICAgSU5JVElBTCA9IFwiaW5pdGlhbFwiLFxuICAgIEZJTkFMID0gXCJmaW5hbFwiXG59XG5cbmV4cG9ydCBjb25zdCBFWFBFQ1RFRF9DU1ZfRklFTERTID0gW1xuICAgICdkX21lYXNfMScsICdkX21lYXNfMicsICdkX21lYXNfMycsICdkX21lYXNfNCcsICdkX21lYXNfNScsXG4gICAgJ29fbWVhc18xJywgJ29fbWVhc18yJywgJ29fbWVhc18zJywgJ29fbWVhc180JywgJ29fbWVhc181JyxcbiAgICAnc2FtcGxlX3RpbWVzXzEnLCAnc2FtcGxlX3RpbWVzXzInLCAnc2FtcGxlX3RpbWVzXzMnLCAnc2FtcGxlX3RpbWVzXzQnLCAnc2FtcGxlX3RpbWVzXzUnLCAnc2FtcGxlX3RpbWVzXzYnLFxuICAgICdkb3NlX3dlaWdodF9kJywgJ2Rvc2Vfd2VpZ2h0X28nLFxuICAgICdkb3NlX2VucmljaG1lbnRfZCcsICdkb3NlX2VucmljaG1lbnRfbycsXG4gICAgJ3N1YmplY3Rfd2VpZ2h0X2luaXRpYWwnLCAnc3ViamVjdF93ZWlnaHRfZmluYWwnLFxuICAgICdzdWJqZWN0X2lkJ1xuXTtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRDU1ZJbnB1dHMge1xuICAgIGRfbWVhc18xOiBzdHJpbmcsXG4gICAgZF9tZWFzXzI6IHN0cmluZyxcbiAgICBkX21lYXNfMzogc3RyaW5nLFxuICAgIGRfbWVhc180OiBzdHJpbmcsXG4gICAgZF9tZWFzXzU6IHN0cmluZyxcbiAgICBvX21lYXNfMTogc3RyaW5nLFxuICAgIG9fbWVhc18yOiBzdHJpbmcsXG4gICAgb19tZWFzXzM6IHN0cmluZyxcbiAgICBvX21lYXNfNDogc3RyaW5nLFxuICAgIG9fbWVhc181OiBzdHJpbmcsXG4gICAgc2FtcGxlX3RpbWVfMTogc3RyaW5nLFxuICAgIHNhbXBsZV90aW1lXzI6IHN0cmluZyxcbiAgICBzYW1wbGVfdGltZV8zOiBzdHJpbmcsXG4gICAgc2FtcGxlX3RpbWVfNDogc3RyaW5nLFxuICAgIHNhbXBsZV90aW1lXzU6IHN0cmluZyxcbiAgICBzYW1wbGVfdGltZV82OiBzdHJpbmcsXG4gICAgZG9zZV93ZWlnaHRfZD86IHN0cmluZyxcbiAgICBkb3NlX3dlaWdodF9vPzogc3RyaW5nLFxuICAgIGRvc2Vfd2VpZ2h0Pzogc3RyaW5nXG4gICAgZG9zZV9lbnJpY2htZW50X2Q6IHN0cmluZyxcbiAgICBkb3NlX2VucmljaG1lbnRfbzogc3RyaW5nLFxuICAgIHN1YmplY3Rfd2VpZ2h0X2luaXRpYWw6IHN0cmluZyxcbiAgICBzdWJqZWN0X3dlaWdodF9maW5hbDogc3RyaW5nLFxuICAgIHN1YmplY3RfaWQ6IHN0cmluZyxcbiAgICBpbl9wZXJtaWw/OiBzdHJpbmdcbn0iXX0=
