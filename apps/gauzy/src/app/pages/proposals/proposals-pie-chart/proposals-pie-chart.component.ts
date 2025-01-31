import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { TranslationBaseComponent } from '@gauzy/ui-sdk/shared';

@Component({
	selector: 'ngx-proposals-pie-chart',
	template: `<canvas baseChart [options]="options" class="echart"></canvas>`,
	styleUrls: ['./proposals-pie-chart.component.scss']
})
export class ProposalsPieChartComponent extends TranslationBaseComponent implements AfterViewInit, OnDestroy {
	@Input() values: { name: string; value: number }[];

	options: any = {};
	themeSubscription: any;

	constructor(private theme: NbThemeService, readonly translateService: TranslateService) {
		super(translateService);
	}

	// TODO translate
	ngAfterViewInit() {
		this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
			const colors = config.variables;
			const echarts: any = config.variables.echarts;
			this.options = {
				backgroundColor: echarts.bg,
				color: [
					colors.warningLight,
					colors.infoLight,
					colors.dangerLight,
					colors.successLight,
					colors.primaryLight
				],
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: [
						this.getTranslation('PROPOSALS_PAGE.ACCEPTED_PROPOSALS'),
						this.getTranslation('PROPOSALS_PAGE.TOTAL_PROPOSALS')
					],
					textStyle: {
						color: echarts.textColor
					}
				},
				series: [
					{
						name: this.getTranslation('PROPOSALS_PAGE.PROPOSALS'),
						type: 'pie',
						radius: '80%',
						center: ['50%', '50%'],
						data: this.values,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: echarts.itemHoverShadowColor
							}
						},
						label: {
							normal: {
								textStyle: {
									color: echarts.textColor
								}
							}
						},
						labelLine: {
							normal: {
								lineStyle: {
									color: echarts.axisLineColor
								}
							}
						}
					}
				]
			};
		});
	}

	ngOnDestroy(): void {
		this.themeSubscription.unsubscribe();
	}
}
