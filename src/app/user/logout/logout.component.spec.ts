import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { commonTestingModules, commonTestingProviders } from 'src/app/common/common.testing'

import { LogoutComponent } from './logout.component'

describe('LogoutComponent', () => {
  let component: LogoutComponent
  let fixture: ComponentFixture<LogoutComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LogoutComponent],
        providers: commonTestingProviders,
        imports: commonTestingModules,
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
